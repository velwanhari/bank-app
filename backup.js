const modelUser = require("./models/user");
const staffUser = require("./models/staff");
const account = require("./models/account");
const transaction = require("./models/transaction");
const customer = require("./models/customer");
const { ObjectId, Collection } = require("mongodb");

const main = async () => {
  // const u = {
  //     email : "customer_three@mail.com",
  //     password : "1234",
  //     type : "customer",
  //     relation_id : 0
  // };
  // const dbUser = await modelUser.insertUser(u);
  // console.log(dbUser);

  //   const x = {
  //     password: "9876",
  //   };

  //   const fltr = {
  //     _id: new ObjectId("648edb721ca6edddd57fd3ac"),
  //   };

  //   const resp = await modelUser.updateUser(fltr, x);
  //   const resp = await modelUser.updateUserById("648edb721ca6edddd57fd3ac", x);

  // await modelUser.deleteUserbyId("648edb721ca6edddd57fd3ac");
  // const usrs = await modelUser.getByFilter({});
  // console.log(usrs);

  // const staff={
  //   name:'staff2',
  //   address:'navsari',
  //   emp_id:'0'
  // }
  // const sUser=await staffUser.insertStaff(staff)

  // const y = {
  //   address: "navsrai1010",
  // };
  // const fltr={
  //   _id:'64904e4b3e02c10cc1c71a80'
  // name:'staff2'
  // }
  // const resp=await staffUser.updateStaff(fltr,y)
  // const resp= await staffUser.updateStaffById("64904e4b3e02c10cc1c71a80",y)

  // await staffUser.deletStaff('64904e4b3e02c10cc1c71a80')
  // const del = await staffUser.deleteStaffById('6490594aa84c10d6de90511c');

  // const user=await staffUser.getById('64904e5732fef7b23e7d74a1')

  // const user = await staffUser.getByFilter({});

  // console.log(user);

  // const x={
  //   accountType:'FD',
  //   balance:'110010',
  //   accountNUmber:'890'
  // }

  // const sUser=await account.insertAccount(x)

  // const fltr={
  // accountType:'saving'
  //   id:'649436811b59e2790eb083aa'
  // }
  // const y={
  //   balance:'10000'
  // }
  // const sUser=await account.updateAccountById(fltr,y)

  // const x={
  //   accountType:'FD'
  // }
  // const sUser=await account.deleteAccount(x)

  // const sUser=await account.deleteAccountById('64943988c743e4da08d15114')

  // const sUser=await account.getById('649436811b59e2790eb083aa')

  // const sUser=await account.getByFilter({})

  // const x={
  //   account_id:'890',
  //   isCredit:'false',
  //   amount:'10000',
  //   desc:'hello hi',
  //   type:'online'
  // }

  // const sUser=await transaction.insertTrasaction(x);

  // const fltr={
  // account_id:'123',
  //   id:'64943df1bb34be6393d14c6e'
  // }
  // const y={
  //   amount:'11010'
  // }
  // const sUser=await transaction.updateTransactionById(fltr,y)

  // const x={
  //   account_id:'890'
  // }
  // const sUser=await transaction.deletTransactionById('649441e44de43178773bd53d')

  // const sUser=await transaction.getById('64943df1bb34be6393d14c6e')
  // const sUser = await transaction.getByFilter({});
  // console.log(sUser);

  // const x = {
  //   name: "shyam",
  //   photo: "hi",
  //   phoneNumber: "1230",
  //   email: "shyam@gmail.com",
  //   address: "surat123",
  //   kyc: "false",
  //   pan: "qwer145rv",
  // };
  // const y= {
  //   name: "shyam",
  //   photo: "hi",
  //   phoneNumber: "1230",
  //   email: "shyam@gmail.com",
  //   address: "surat123",
  //   kyc: "false",
  //   pan: "qwer145rv",
  // };

  // const sUse=await customer.insertCustomer(y)

  // const fltr={
  //   // name:'shyam'
  //   id:'6496a01e54ba6ae07422591b'
  // }
  // const data={
  //   email:'shyam1234@gmail.com'
  // }
  // const sUser=await customer.updateCustomerById(fltr,data)

  // const x={
  //   name:'shyam'
  // }

  // const sUser=await customer.deleteCutomer(x)
  // const sUser = await customer.deleteCutomerById("6496a4353220b3f03c99bcb9");

  // const sUser=await customer.getByFilter({})

  const sUser = await customer.getById("6496a414c783c43c39add1f5");
  console.log(sUser);

  process.exit(0);
};

main();
