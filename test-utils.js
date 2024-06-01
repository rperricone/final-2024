const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const models = [
  require("./src/models/token"),
  require("./src/models/user"),
  require("./src/models/activity"),
  require("./src/models/ticket"),
];

module.exports = {};

module.exports.connectDB = async () => {
  await mongoose
  .connect(process.env.MONGO_TEST_URL, {
   
    authSource: "admin",
    user: "root",
    pass: "example",
    useUnifiedTopology: true,
})
  await Promise.all(models.map((m) => m.syncIndexes()));
};
module.exports.closeDB = async () => {
  await mongoose.connection.close();
};

module.exports.stopDB = async () => {
  await mongoose.disconnect();
};

module.exports.clearDB = async () => {
  await Promise.all(models.map((model) => model.deleteMany()));
};

module.exports.findOne = async (model, query) => {
  const result = await model.findOne(query).lean();
  if (result) {
    result._id = result._id.toString();
  }
  return result;
};

module.exports.find = async (model, query) => {
  const results = await model.find(query).lean();
  results.forEach((result) => {
    result._id = result._id.toString();
  });
  return results;
};
