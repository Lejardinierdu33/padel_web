const PostModel = require("../models/post.model");

// Methode GET
module.exports.getMatch = async (req, res) => {
  const secteurLieuFilter = req.query.secteurLieu;
  const heureFilter = req.query.heure;
  const niveauPadelFilter = req.query.niveauPadel;

  try {
    let posts;

    if (secteurLieuFilter && heureFilter && niveauPadelFilter) {
      // Filtre par secteurLieu, tranche horaire et niveauPadel
      posts = await PostModel.find({
        secteurLieu: secteurLieuFilter,
        heure: { $gte: heureFilter.start, $lte: heureFilter.end },
        niveauPadel: { $in: niveauPadelFilter.split(',') }
      });
    } else if (secteurLieuFilter && heureFilter) {
      // Filtre par secteurLieu et tranche horaire uniquement
      posts = await PostModel.find({
        secteurLieu: secteurLieuFilter,
        heure: { $gte: heureFilter.start, $lte: heureFilter.end }
      });
    } else if (secteurLieuFilter && niveauPadelFilter) {
      // Filtre par secteurLieu et niveauPadel uniquement
      posts = await PostModel.find({
        secteurLieu: secteurLieuFilter,
        niveauPadel: { $in: niveauPadelFilter.split(',') }
      });
    } else if (heureFilter && niveauPadelFilter) {
      // Filtre par tranche horaire et niveauPadel uniquement
      posts = await PostModel.find({
        heure: { $gte: heureFilter.start, $lte: heureFilter.end },
        niveauPadel: { $in: niveauPadelFilter.split(',') }
      });
    } else if (secteurLieuFilter) {
      // Filtre par secteurLieu uniquement
      posts = await PostModel.find({ secteurLieu: secteurLieuFilter });
    } else if (heureFilter) {
      // Filtre par tranche horaire uniquement
      posts = await PostModel.find({
        heure: { $gte: heureFilter.start, $lte: heureFilter.end }
      });
    } else if (niveauPadelFilter) {
      // Filtre par niveauPadel uniquement
      posts = await PostModel.find({
        niveauPadel: { $in: niveauPadelFilter.split(',') }
      });
    } else {
      // Pas de filtres, renvoie tous les matchs
      posts = await PostModel.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des matchs." });
  }
};

// Methode POST
module.exports.setMatch = async (req, res) => {
  try {
    const post = await PostModel.create({
      utilisateur: req.body.utilisateur,
      date: req.body.date,
      heure: req.body.heure,
      personnesManquantes: req.body.personnesManquantes,
      niveauMatch: req.body.niveauMatch,
      prixSession: req.body.prixSession,
      lieu: req.body.lieu,
      secteurLieu: req.body.secteurLieu,
      clubPadel: req.body.clubPadel,
      terrain: req.body.terrain
    });

    // Recherchez le document complet pour obtenir toutes les informations
    const newPost = await PostModel.findById(post._id);

    res.status(200).json(newPost);
  } catch (error) {
    console.error("Erreur lors de l'ajout du match:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout du match." });
  }
};
// Methode PUT
module.exports.editMatch = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      req.body,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Match non trouvé" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du match:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du match." });
  }
};

// Methode DELETE
module.exports.deleteMatch = async (req, res) => {
  const post = await PostModel.findByIdAndDelete(req.params.id);

  if (!post) {
    res.status(400).json({ message: "Match non trouvé" });
  }

  res.status(200).json({ message: "Match id : " + post + " supprimé" });
};


// Fonction pour obtenir un utilisateur par son ID
module.exports.getMatchById = async (req, res) => {
  const matchId = req.params.id;

  try {
    // Recherchez l'utilisateur par son ID dans la base de données
    const match = await PostModel.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match non trouvé" });
    }

    // Renvoyez les données de l'utilisateur en tant que réponse
    res.status(200).json(match);
  } catch (error) {
    // Gérez les erreurs, par exemple, en renvoyant un code d'erreur 500 en cas d'erreur interne du serveur
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du match" });
  }
};
