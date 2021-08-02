import chai from "chai";
import mongoose from "mongoose";
import server from "../../index";
import chaiHttp from "chai-http";
import config from "../../config";

const expect = chai.expect;
chai.use(chaiHttp);
const url = config.MONGO_URL || "localhost";
describe("User (e2e)", () => {
  before((done) => {
    mongoose.connect(`mongodb://${url}:27017/test`, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });
  describe("Api User", () => {
    it("should create a user", (done: Function) => {
      chai
        .request(server)
        .post("/api/v1/users")
        .set("content-type", "application/json")
        .send({
          name: "Jake",
          email: "jake2@gmail.com",
          password: "awesome",
        })
        .end((err: Error, res: any) => {
          expect(res.status).to.be.equal(201);
          expect(res.body.data.name).to.be.equal("Jake");
          done();
        });
    });

    it("should be able to login user", (done: Function): void => {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({ email: "jake2@gmail.com", password: "awesome" })
        .end((err: Error, res: any): void => {
          expect(res.status).to.be.equal(200);
          expect(res.body.token).to.be.string;
          done();
        });
    });
  });
});
