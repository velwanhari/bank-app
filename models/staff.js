const { ObjectId } = require("mongodb");
const getMongoClient = require("./../configs/mongoClient");

const getCollection = () => {
  const client = getMongoClient();
  const database = client.db("bank");
  const collection = database.collection("staff");
  return collection;
};

const insertStaff = async (staff) => {
  const collection = getCollection();
  await collection.insertOne(staff);
  return staff;
};

const updateStaff = async (filter, data) => {
  const collection = getCollection();
  await collection.updateMany(filter, { $set: data });
};

const updateStaffById = async (id, data) => {
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
const deletStaff = async (filter) => {
  const collection = getCollection();
  await collection.deleteOne(filter);
};

const deleteStaffById = async (id) => {
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
  const dUser = await collection.findOne(fltr);
  return dUser;
};

const getByFilter = async (filter) => {
  const collection = getCollection();
  const dUser = await collection.find(filter).toArray();
  return dUser;
};
module.exports = {
  insertStaff,
  updateStaff,
  updateStaffById,
  deletStaff,
  deleteStaffById,
  getById,
  getByFilter,
};
