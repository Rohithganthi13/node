const mongoDb = require("mongodb");
const { getDb } = require("../utils/database");
class Users {
  constructor(userName, userEmail) {
    this.name = userName;
    this.email = userEmail;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("User saved");
        return result;
      })
      .catch((err) => console.log(err));
  }
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongoDb.ObjectId(userId) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Users;
