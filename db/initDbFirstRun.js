const { MongoClient } = require('mongodb');
const milksDb = require('../db/milksDb.json');

const url = `mongodb://andrea:password123@localhost:27017`
const dbName = 'milk';

const connect = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  const collection = db.collection('milk');
  db.on('close', () => {
    console.log('connection closed');
  });
  db.on('reconnect', () => {
    console.log('reconnected');
  });
  return { collection, client };
};

const initDb = async () => {
  const { collection, client } = await connect();
  milksDb.results.forEach(milk => collection.insertOne(milk));
  setTimeout(() => client.close(), 1000);
};

initDb();

module.exports.initDb = initDb;
