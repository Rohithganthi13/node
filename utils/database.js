const mongoDb = require("mongodb");

const MongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://node_app:XSlLhxDniwDNWzpz@cluster0.ypvgpg6.mongodb.net/?appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected!!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else throw "DB Not Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
