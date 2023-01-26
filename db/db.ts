import { IMilk } from "type";
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

export const getAllFilteredMilkbyPage = async (type: string, page: string): Promise<IMilk[]> => {
  const { collection, client } = await connect();
  const data = await collection.find({ type: type }).skip((Number(page) - 1) * 9).limit(9);
  setTimeout(() => client.close(), 1000);
  return data.toArray();
};

export const getAllbyPage = async (page: string): Promise<IMilk[]> => {
  const { collection, client } = await connect();
  const data = await collection.find().skip((Number(page) - 1) * 9).limit(9);
  setTimeout(() => client.close(), 1000);
  return data.toArray();
};

export const getAllbyType = async (type: string): Promise<IMilk[]> => {
  const { collection, client } = await connect();
  const data = await collection.find({ "type": type }).limit(9);
  setTimeout(() => client.close(), 1000);
  return data.toArray();
};

export const getAllbyDefault = async (): Promise<IMilk[]> => {
  const { collection, client } = await connect();
  const data = await collection.find().limit(9);
  setTimeout(() => client.close(), 1000);
  return data.toArray();
}

export const countAllData = async (filter: string | null): Promise<number> => {
  const { collection, client } = await connect();
  const numberOfItems = filter ? await collection.countDocuments({ type: filter }) : await collection.countDocuments();
  setTimeout(() => client.close(), 1000);
  return numberOfItems;
};

export const getAllTypes = async (): Promise<string[]> => {
  const { collection, client } = await connect();
  const arrayOfTypes = await collection.distinct("type");
  setTimeout(() => client.close(), 1000);
  return arrayOfTypes;
};

export const findAllFromSearch = async (search: string, page: string): Promise<IMilk[]> => {
  const { collection, client } = await connect();
  const searchData = page === '1' ? await collection.find({ name: { $regex: `${search}`, $options: 'i' } }).limit(9) : await collection.find({ name: { $regex: `${search}`, $options: 'i' } }).skip((Number(page) - 1) * 9).limit(9)
  setTimeout(() => client.close(), 1000);
  return searchData.toArray();
}

export const countAllDataSearch = async (search: string): Promise<number> => {
  const { collection, client } = await connect();
  const numberOfItems = await collection.countDocuments({ name: search });
  setTimeout(() => client.close(), 1000);
  return numberOfItems;
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