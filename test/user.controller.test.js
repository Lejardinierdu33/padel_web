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

  // Vous pouvez ajouter d'autres tests pour les différentes fonctions du contrôleur
});
