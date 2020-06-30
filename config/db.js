require('dotenv').config();

const mongoose = require("mongoose");


const mongoURI = process.env.DATABASEURL;
const connectOptions = {
  keepAlive: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
};
mongoose.Promise = global.Promise;

exports.connectDb = async () => {
  mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, err);
    console.log(`Connected to MongoDB`);
  });
}