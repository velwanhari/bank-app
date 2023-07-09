const { ObjectId } = require("mongodb");
const getMongoClient = require("./../configs/mongoClient");

const getCollection = () => {
  const client = getMongoClient();
  const database = client.db("bank");
  const collection = database.collection("account");
  return collection;
};

const insertAccount = async (acc) => {
  const collection = getCollection();
  await collection.insertOne(acc);
  return acc;
};

const updateAccount = async (filter, data) => {
  const collection = getCollection();
  await collection.updateMany(filter, { $set: data });
};

const updateAccountById = async (id, data) => {
  const collection = getCollection();
  const fltr = {
    _id: new ObjectId(id),
  };

  const dbresp = await collection.updateOne(fltr, { $set: data });
  if (dbresp && dbresp.acknowledged) {
    const dUser = collection.findOne(fltr);
    return dUser;
  }
  return null;
};

const deleteAccount = async (filter) => {
  const collection = getCollection();
  await collection.deleteMany(filter);
};

const deleteAccountById = async (id) => {
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
  const sUser = await collection.findOne(fltr);
  return sUser;
};

const getByFilter = async (filter) => {
  const collection = getCollection();
  const sUser = await collection.find(filter).toArray();
  return sUser;
};

module.exports = {
  insertAccount,
  updateAccount,
  updateAccountById,
  deleteAccount,
  deleteAccountById,
  getById,
  getByFilter,
};
