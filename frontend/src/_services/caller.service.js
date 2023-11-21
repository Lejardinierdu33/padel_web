// Importer la bibliothèque Axios
import axios from "axios";

// Créer une instance Axios avec une base d'URL préconfigurée
const Axios = axios.create({
    baseURL: "http://localhost:5000"
});

// Exporter l'instance Axios configurée en tant que module par défaut
export default Axios;
