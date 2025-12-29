const mongoose = require("mongoose");

const ConnectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected sucessfully`)
  } catch (error) {
    console.log('error ocuured while connecting')
  }
};

module.exports=ConnectDB
