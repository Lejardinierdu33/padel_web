const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

// Fonction pour obtenir la liste de tous les utilisateurs
module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};

module.exports.get = async (req, res) => {
  console.log('hello World !')
}

// Fonction pour créer un nouvel utilisateur
module.exports.createUser = async (req, res) => {
  // Vérifiez si tous les champs nécessaires sont présents
  if (!req.body.nom || !req.body.motDePasse || !req.body.email) {
    return res
      .status(400)
      .json({ message: "Merci de remplir tous les champs" });
  }

  // Créez un nouvel utilisateur
  const user = await UserModel.create({
    role: req.body.role,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    motDePasse: req.body.motDePasse,
    photo: req.body.photo,
    dateDeNaissance: req.body.dateDeNaissance,
    niveauPadel: req.body.niveauPadel,
    secteurJeu: req.body.secteurJeu,
    telephone: req.body.telephone
  });

  res.status(200).json(user);
};

// Fonction pour authentifier l'utilisateur et générer un token JWT
module.exports.authenticateUser = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    // Vérifiez l'e-mail de l'utilisateur et le mot de passe avec la base de données
    const user = await UserModel.findOne({ email });

    if (!user || !(await user.isValidPassword(motDePasse))) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Créez un jeton d'authentification avec le rôle inclus dans le payload
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        photo: user.photo,
        email: user.email,
        telephone: user.telephone,
      },
      process.env.JWT_SECRET
    );

    res
      .status(200)
      .json({
        token,
        userId: user._id,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        photo: user.photo,
        email: user.email,
        telephone: user.telephone,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'authentification" });
  }
};


const blacklistedTokens = new Set();

module.exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Ajoutez le token à la liste noire
    blacklistedTokens.add(token);

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
};

// Middleware pour valider le token et vérifier s'il est dans la liste noire
module.exports.authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  // Vérifiez si le token est dans la liste noire
  if (blacklistedTokens.has(token)) {
    return res.status(403).json({ message: "Token invalide" });
  }

  // Vérifiez le token en utilisant la clé secrète
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token non valide" });
    }

    req.user = user;
    next();
  });
};

// Fonction pour supprimer un utilisateur par son ID
module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  // Supprimez l'utilisateur par son ID
  const user = await UserModel.findByIdAndDelete(userId);

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non trouvé" });
  }

  res.status(200).json({ message: "Utilisateur supprimé avec succès" });
};

// Fonction pour mettre à jour les informations d'un utilisateur par son ID
module.exports.updateUser = async (req, res) => {
  const userId = req.params.id;

  // Mettez à jour l'utilisateur par son ID
  const user = await UserModel.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non trouvé" });
  }

  res.status(200).json(user);
};

// Fonction pour obtenir un utilisateur par son ID
module.exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    // Recherchez l'utilisateur par son ID dans la base de données
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Renvoyez les données de l'utilisateur en tant que réponse
    res.status(200).json(user);
  } catch (error) {
    // Gérez les erreurs, par exemple, en renvoyant un code d'erreur 500 en cas d'erreur interne du serveur
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'utilisateur",
    });
  }
};

// Fonction pour mettre à jour le mot de passe d'un utilisateur par son ID
module.exports.updatePassword = async (req, res) => {
  console.log("Entrée dans updatePassword");
  const userId = req.params.id;
  const oldPassword = req.body.oldPassword;
  const motDePasse = req.body.motDePasse;

  try {
    console.log("userId:", userId);
    console.log("oldPassword:", oldPassword);
    console.log("motDePasse:", motDePasse);
    const user = await UserModel.findById(userId);

    // Vérifiez si l'ancien mot de passe est correct
    if (!user || !(await user.isValidPassword(oldPassword))) {
      return res.status(401).json({ message: "L'ancien mot de passe est incorrect." });
    }

    // Mettez à jour le mot de passe seulement s'il a été modifié
    if (user.motDePasse !== motDePasse) {
      user.motDePasse = motDePasse;
      // Enregistrez l'utilisateur mis à jour
      await user.save();
      res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } else {
      res.status(200).json({ message: "Aucune modification du mot de passe nécessaire." });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du mot de passe." });
  }
};
