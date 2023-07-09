const { ObjectId } = require("mongodb");
const getMongoClient = require("../configs/mongoClient");

const getCollection = () => {
  const client = getMongoClient();
  const database = client.db("bank");
  const collection = database.collection("customer");
  return collection;
};

const insertCustomer = async (cust) => {
  const collection = getCollection();
  await collection.insertOne(cust);
  return cust;
};

const updateCustomer = async (filter, data) => {
  const collection = getCollection();
  await collection.updateMany(filter, { $set: data });
};

const updateCustomerById = async (id, data) => {
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

const deleteCutomer = async (fltr) => {
  const collection = getCollection();
  await collection.deleteMany(fltr);
};

const deleteCutomerById = async (id) => {
  const collection = getCollection();
  const fltr = {
    _id: new ObjectId(id),
  };
  await collection.deleteOne(fltr);
};

const getByFilter = async (filter) => {
  const collection = getCollection();
  const dbUser = await collection.find(filter).toArray();
  return dbUser;
};

const getById = async (id) => {
  const collection = getCollection();
  const fltr = {
    _id: new ObjectId(id),
  };
  const dbUser = await collection.findOne(fltr);
  return dbUser;
};
module.exports = {
  insertCustomer,
  updateCustomer,
  updateCustomerById,
  deleteCutomer,
  deleteCutomerById,
  getByFilter,
  getById,
};
