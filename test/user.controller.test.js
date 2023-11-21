//During the test the env variable is set to test process.env.NODE_ENV = 'test';
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../backend/server");

chai.use(chaiHttp);

describe("User Controller Tests", () => {
  // Testez la route GET /users
  describe("GET /users", (done) => {
    it("should get all users", () => {
      chai.request(app)
      .get("/users")
      .end((err, res) => {
        if(res) res.should.have.status(200);
        done();
      })
      
    })
  });

  // Vous pouvez ajouter d'autres tests pour les différentes fonctions du contrôleur
});
