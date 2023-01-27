import { Request } from 'express';
import { IMilk, IQuery } from "type";
const { MongoClient } = require('mongodb');

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

export const getAll = async (req: Request<{}, {}, {}, IQuery>): Promise<IMilk[]> => {
  const { collection, client } = await connect();
  if (req.query.type && req.query.search) {
    const data = await collection.find({ name: { $regex: req.query.search, $options: 'i' } }, { type: req.query.type }).skip((Number(req.query.page) - 1) * 9).limit(9);
    setTimeout(() => client.close(), 1000);
    return data.toArray();
  }
  if (req.query.type) {
    const data = await collection.find({ type: req.query.type }).skip((Number(req.query.page) - 1) * 9).limit(9);
    setTimeout(() => client.close(), 1000);
    return data.toArray();
  }
  if (req.query.search) {
    const data = await collection.find({ name: { $regex: req.query.search, $options: 'i' } }).skip((Number(req.query.page) - 1) * 9).limit(9);
    setTimeout(() => client.close(), 1000);
    return data.toArray();
  }
  const data = await collection.find().skip((Number(req.query.page) - 1) * 9).limit(9);
  setTimeout(() => client.close(), 1000);
  return data.toArray();
};

export const countAll = async (req: Request<{}, {}, {}, IQuery>): Promise<number> => {
  const { collection, client } = await connect();
  if (req.query.type && req.query.search) {
    const numberOfItems = await collection.find({ name: { $regex: req.query.search, $options: 'i' } }, { type: req.query.type }).count();
    setTimeout(() => client.close(), 1000);
    return numberOfItems;
  }
  if (req.query.type) {
    const numberOfItems = await collection.find({ type: req.query.type }).count();
    setTimeout(() => client.close(), 1000);
    return numberOfItems;
  }
  if (req.query.search) {
    const numberOfItems = await collection.find({ name: { $regex: req.query.search, $options: 'i' } }).count();
    setTimeout(() => client.close(), 1000);
    return numberOfItems;
  }
  const numberOfItems = await collection.countDocuments();
  setTimeout(() => client.close(), 1000);
  return numberOfItems;
};

export const getAllTypes = async (): Promise<string[]> => {
  const { collection, client } = await connect();
  const arrayOfTypes = await collection.distinct("type");
  setTimeout(() => client.close(), 1000);
  return arrayOfTypes;
};

export const getDataByID = async (id: string): Promise<IMilk> => {
  const { collection, client } = await connect();
  const data = await collection.findOne({ id: id });
  setTimeout(() => client.close(), 1000);
  return data;
};

export const updateDataByID = async (id: string, quantity: string): Promise<IMilk> => {
  const { collection, client } = await connect();
  const data = await collection.updateOne({ id: id }, { $set: { storage: quantity } });
  setTimeout(() => client.close(), 1000);
  return data;
};