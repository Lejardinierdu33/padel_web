const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Définition du schéma utilisateur
const userSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "admin"], // Le rôle doit être soit "user" soit "admin"
    default: "user", // Par défaut, le rôle est "user"
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // L'adresse e-mail doit être unique dans la base de données
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value); // Validation simple de l'adresse e-mail
      },
      message: "Adresse email invalide",
    },
  },
  telephone: {
    type: String,
  },
  photo: {
    type: String,
  },
  motDePasse: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(value);
        // Validation du mot de passe : au moins une lettre majuscule, un chiffre, un caractère spécial
      },
      message:
        "Le mot de passe doit contenir au moins une lettre majuscule, un chiffre, un caractère spécial",
    },
  },
  dateDeNaissance: {
    type: Date,
  },
  niveauPadel: {
    type: Number,
    min: 1,
    required: true,
    max: 10,
  },
  secteurJeu: {
    type: String,
    enum: ["Sud", "Nord", "Est", "Ouest"], // Le secteur de jeu doit être l'un des quatre enumérés
  },
});

// Middleware pre('save') pour hacher le mot de passe avant de sauvegarder dans la base de données
userSchema.pre("save", async function (next) {
  try {
    console.log("Middleware pre('save') triggered");
    if (this.isModified("motDePasse")) {
      // Vérifier si le mot de passe a été modifié
      // Générer un sel et hacher le mot de passe avec 10 tours.
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.motDePasse, salt);
      this.motDePasse = hashedPassword;

      console.log(this.motDePasse);
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Méthode pour vérifier si le mot de passe donné correspond à celui stocké dans la base de données
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.motDePasse);
};

// userSchema.post("save", async function (doc, next) {
//   return next(null, doc);
// });

// Création du modèle utilisateur avec le schéma défini
const User = mongoose.model("User", userSchema);

// Export du modèle utilisateur pour être utilisé dans d'autres fichiers
module.exports = User;
