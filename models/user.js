const { ObjectId } = require("mongodb");
const getMongoClient = require("./../configs/mongoClient");

const getCollection = () => {
  const client = getMongoClient();
  const database = client.db("bank");
  const collection = database.collection("users");
  return collection;
};

const insertUser = async (user) => {
  const collection = getCollection();
  await collection.insertOne(user);
  return user;
};

const updateUsers = async (filter, data) => {
  const collection = getCollection();
  await collection.updateMany(filter, { $set: data });
};

const updateUserById = async (id, data) => {
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

const deleteUsers = async (filter) => {
  const collection = getCollection();
  await collection.deleteMany(filter);
};

const deleteUserbyId = async (id) => {
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
  insertUser,
  updateUsers,
  updateUserById,
  deleteUsers,
  deleteUserbyId,
  getById,
  getByFilter,
};
