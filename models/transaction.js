const { ObjectId } = require("mongodb");
const getMongoClient = require("./../configs/mongoClient");

const getCollection = () => {
  const client = getMongoClient();
  const database = client.db("bank");
  const collection = database.collection("transaction");
  return collection;
};

const insertTrasaction = async (tran) => {
  const collection = getCollection();
  await collection.insertOne(tran);
  return tran;
};

const updateTransaction = async (filter, data) => {
  const collection = getCollection();
  await collection.updateMany(filter, { $set: data });
};

const updateTransactionById = async (id, data) => {
  const collection = getCollection();
  const fltr = {
    _id: new ObjectId(id),
  };
  const dbresp = await collection.updateOne(fltr, { $set: data });
  if (dbresp && dbresp.acknowledged) {
    const dbUser = collection.findOne(fltr);
    return dbUser;
  }
  return null;
};

const deletTransaction = async (filter) => {
  const collection = getCollection();
  await collection.deleteMany(filter);
};
const deletTransactionById = async (id) => {
  const collection = getCollection();
  const fltr = {
    _id: new ObjectId(id),
  };
  await collection.deleteOne(fltr);
};

const getById = async (id) => {
  const collection = getCollection();
  const fltr = {
    _id: new ObjectId(id),
  };
  const dbUser = await collection.findOne(fltr);
  return dbUser;
};

const getByFilter = async (filter) => {
  const collection = getCollection();
  const dbUser = await collection.find(filter).toArray();
  return dbUser;
};

module.exports = {
  insertTrasaction,
  updateTransaction,
  updateTransactionById,
  deletTransaction,
  deletTransactionById,
  getById,
  getByFilter,
};
