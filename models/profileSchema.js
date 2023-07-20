var mongoose = require('mongoose');
var db = require('../db/conn');
var ProfileSchema = new mongoose.Schema({
  Id: Number,
  PoliticianName: String,
  PoliticalPartyName: String,
  MailId: String,
  PhoneNumber: String,
  Partyofficelocation: String,
  YouTubeLink: String,
  InstagramId: String,
  FecebookId: String,
  TwitterId: String,
  multipalPhoto: Array,
  PoliticanPhoto: Array,
  PoliticalPartylogo: Array,
  PoliticiansInformation: String,
});

profileTable = mongoose.model('users', ProfileSchema);
const createData = function (inputData, callback) {
  const userData = new profileTable(inputData);

  userData.save()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};


const getAllUser = function (callback) {
  const userData = profileTable.find({});
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};
const getOneUserById = function (id,callback) {
  const userData = profileTable.find(id);
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};



module.exports = {
  createData,
  getAllUser,
  getOneUserById
}