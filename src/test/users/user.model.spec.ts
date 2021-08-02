import mongoose from "mongoose";
import { UserModel } from "../../users/user.model";
import * as chai from "chai";
import config from "../../config";

const expect = chai.expect;

const url = config.MONGO_URL || "localhost";
describe("User Model", () => {
  before((done) => {
    mongoose.connect(`mongodb://${url}:27017/test`, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });

  describe("Models User", () => {
    it("should create new user", async () => {
      const user = new UserModel();
      user.name = "Jade";
      user.email = "jad@gmail.com";
      user.password = "good";

      const res = await user.save();

      expect(res).to.be.an("object");
      expect(res.name).to.be.equal("Jade");
    });
  });
});
