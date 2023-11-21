// Import d'Axios depuis le service Axios (probablement configuré ailleurs)

import Axios from "./caller.service";

// Service pour gérer l'authentification des utilisateurs
let login = (credentials) => {
  return Axios.post("/users/login", credentials);
};

// Services pour gérer les informations des utilisateurs
let getUsers = () => {
  return Axios.get("/users");
};

let getOneUser = (userId) => {
  return Axios.get(`/users/${userId}`);
};

let postUsers = (userData) => {
  return Axios.post("/users", userData);
};

let deleteUsers = (userId) => {
  return Axios.delete(`/users/${userId}`);
};

let putUsers = (userId, userData) => {
  return Axios.put(`/users/${userId}`, userData);
};

let putUsersPassword = (userId, userData) => {
  return Axios.put(`/users/${userId}/update-password`, userData);
};

// Services pour gérer les informations des terrains
let getTerrains = () => {
  return Axios.get(`/terrains`);
};

let getOneTerrain = (terrainId) => {
  return Axios.get(`/terrains/${terrainId}`);
};

let postTerrains = (terrainData) => {
  return Axios.post(`/terrains`, terrainData);
};

let deleteTerrains = (terrainId) => {
  return Axios.delete(`/terrains/${terrainId}`);
};

let putTerrains = (terrainId, terrainData) => {
  return Axios.put(`/terrains/${terrainId}`, terrainData);
};

// Services pour gérer les informations des matchs
let getMatchs = () => {
  return Axios.get(`/matchs`);
};

let getOneMatch = (matchId) => {
  return Axios.get(`/matchs/${matchId}`);
};

let postMatchs = (matchData) => {
  return Axios.post(`/matchs`, matchData);
};

let deleteMatchs = (matchId) => {
  return Axios.delete(`/matchs/${matchId}`);
};

let putMatchs = (matchId, matchData) => {
  return Axios.put(`/matchs/${matchId}`, matchData);
};

// Fonction newsletter

let postNewsletter = (newsletterData) => {
  return Axios.post(`/subscribe`, newsletterData);
};

let getAllNewsletter = () => {
  return Axios.get(`/newsletter`);
};

let deleteNewsletter = (newsletterId) => {
  return Axios.delete(`/newsletter/${newsletterId}`);
};

let sendGroupEmail = (emailData) => {
  return Axios.post(`/newsletter/sendGroupEmail`, emailData);
};

// Fonction contact

let postContact = (contactData) => {
  return Axios.post(`/contact`, contactData);
};

let getAllMails = () => {
  return Axios.get(`/contact`);
};

let getMail = (mailId) => {
  return Axios.get(`/mails/${mailId}`);
};

let deleteMails = (mailId) => {
  return Axios.delete(`/contact/${mailId}`);
};

// Fonctions pour gérer le token d'authentification
let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token; // Retourne vrai si le token existe, sinon faux
};

// Export des services en tant qu'objet
export const accountService = {
  saveToken,
  logout,
  isLogged,
  login,
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getOneUser,
  getTerrains,
  getOneTerrain,
  postTerrains,
  deleteTerrains,
  putTerrains,
  getMatchs,
  getOneMatch,
  postMatchs,
  deleteMatchs,
  putMatchs,
  deleteNewsletter,
  postNewsletter,
  postContact,
  getMail,
  deleteMails,
  getAllMails,
  getAllNewsletter,
  sendGroupEmail,
  putUsersPassword,
};
