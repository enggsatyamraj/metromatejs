// const mongoose = require("mongoose");
// require("dotenv").config();

// exports.connectWithDb = async () => {
//   mongoose
//     .connect(process.env.DATABASE_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => //console.log("Databse is connected"))
//     .catch((err) => {
//       //console.log("Error in conecting database");
//       //console.log(err.message);
//       process.exit(1);
//     });
// };


const mongoose = require("mongoose");
require("dotenv").config();

exports.connectWithDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //console.log("Database is connected");
  } catch (err) {
    console.error("Error connecting to the database");
    console.error(err.message);
    process.exit(1);
  }
};
