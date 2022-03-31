const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoDbUrl = `enter your db uri here`;

let _db;

exports.initDb = (callback) => {
  if (_db) {
    console.log("Database is already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

exports.getDb = () => {
  if (!_db) {
    throw Error("Database not initialzed");
  }
  return _db;
};
