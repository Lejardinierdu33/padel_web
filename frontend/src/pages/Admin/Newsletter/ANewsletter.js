import React, { useState, useEffect } from "react";
import { accountService } from "../../../_services/account.service";
import { FaTrash } from "react-icons/fa";

export default function ANewsletter() {
  const [emails, setEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState(""); // Ajout de l'état pour le sujet
  const [body, setBody] = useState(""); // Ajout de l'état pour le corps

  useEffect(() => {
    fetchEmails();
  }, []); // Chargement initial

  const fetchEmails = async () => {
    try {
      const response = await accountService.getAllNewsletter();
      setEmails(response.data);
      console.log('Emails after update:', response.data);
    } catch (error) {
      console.error("Error fetching emails from the newsletter:", error);
    }
  };

  const handleSendGroupEmail = () => {
    // Construire la liste d'adresses e-mail séparées par des virgules
    const emailList = emails.map((user) => user.email).join(",");

    // Créer l'URL mailto avec les adresses e-mail et les autres paramètres
    const mailtoURL = `mailto:${emailList}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Ouvrir l'URL dans une nouvelle fenêtre/onglet
    window.open(mailtoURL, "_blank");
  };

  const handleDeleteEmail = async (emailId) => {
    try {
      console.log('Trying to delete email with ID:', emailId);
      await accountService.deleteNewsletter(emailId);
      console.log(`E-mail with ID ${emailId} deleted successfully.`);
      fetchEmails(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <div className="section_user_index">
      <div className="A_User">
        <h1>Liste des E-mails de la Newsletter</h1>
        <input
          aria-label="email-newsletter"
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="group-email">
          <button
            onClick={() => handleSendGroupEmail()}
            className="login-button"
          >
            Envoie Groupé
          </button>
        </div>

        <div className="email-list">
          {emails
            .filter((user) =>
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <div key={user._id} className="email-card">
                <p>{user.email}</p>
                <div className="delete-icon">
                  <FaTrash
                    onClick={() => handleDeleteEmail(user._id)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      marginLeft: "15px",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
