const mongoose = require('mongoose');

const connectDB = async() =>{
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ALitaInfotech");
    console.log(`Mongodb connect ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongo DB Server Issue ${error}`);
  }
};

module.exports = connectDB;