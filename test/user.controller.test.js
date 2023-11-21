const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../backend/server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Controller Tests', () => {
  // Testez la route GET /users
  describe('GET /users', () => {
    it('should get all users', async () => {
      const res = await chai.request(server).get('/users');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      // Ajoutez d'autres assertions selon votre logique
    });
  });

  // // Testez la route POST /users
  // describe('POST /users', () => {
  //   it('should create a new user', async () => {
  //     const user = {
  //       nom: 'John',
  //       prenom: 'Doe',
  //       email: 'john.doe@example.com',
  //       motDePasse: 'Password123!',
  //       photo: 'https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667',
  //       dateDeNaissance: '1995-12-10',
  //       niveauPadel: 5,
  //       secteurJeu: 'Ouest',
  //       telephone: '0670963371'
  //       // Ajoutez d'autres propriétés du modèle user selon vos besoins
  //     };
  
  //     const res = await chai.request(server).post('/users').send(user);
  //     expect(res).to.have.status(201); // Assurez-vous que le code de statut est 201
  //     expect(res.body).to.have.property('nom').equal('John');
  //     // Ajoutez d'autres assertions selon votre logique
  //   });
  // });

  // Vous pouvez ajouter d'autres tests pour les différentes fonctions du contrôleur
});
