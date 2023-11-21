import React, { useState, useEffect } from "react";
import { FaTrash, FaReply } from "react-icons/fa";
import { accountService } from "../../../_services/account.service";
import "../Admin.css";

export default function AMail() {
  const [mails, setMails] = useState([]);

  // Déplacez la définition de fetchMails à l'intérieur du composant
  const fetchMails = async () => {
    try {
      const response = await accountService.getAllMails();
      setMails(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des mails:", error);
    }
  };

  useEffect(() => {
    // Appelez directement fetchMails ici
    fetchMails();
  }, []); // Le tableau vide en tant que dépendance signifie que cet effet s'exécute une seule fois au montage du composant

  // Reste du code inchangé
  const handleDeleteMail = async (mailId) => {
    try {
      await accountService.deleteMails(mailId);
      const updatedMails = mails.filter((mail) => mail._id !== mailId);
      setMails(updatedMails);
      console.log(`Mail avec l'ID ${mailId} supprimé.`);

      // Rafraîchir la liste des mails en rappelant fetchMails
      fetchMails();
    } catch (error) {
      console.error("Erreur lors de la suppression du mail:", error);
    }
  };

  const handleReplyMail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="section_user_index">
      <div className="A_User">
        <h1>Liste des Mails</h1>
        <div className="mail-list">
          {mails.map((mail) => (
            <div key={mail._id} className="mail-card">
              <div className="mail-header">
                <div className="sender-name">{`${mail.firstName} ${mail.lastName}`}</div>
                <div className="delete-icon">
                  <FaTrash
                    onClick={() => handleDeleteMail(mail._id)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "30px",
                    }}
                  />
                </div>
              </div>
              <div className="mail-content">
                <p>
                  <strong>Nom et Prénom:</strong> {mail.firstName}{" "}
                  {mail.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {mail.email}
                </p>
                <p>
                  <strong>Raison du contact:</strong> {mail.reason}
                </p>
              </div>
              <div className="reply-button">
                <FaReply
                  onClick={() => handleReplyMail(mail.email)}
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    fontSize: "30px",
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
