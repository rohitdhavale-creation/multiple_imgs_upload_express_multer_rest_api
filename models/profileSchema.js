var mongoose = require('mongoose');
var db = require('../db/conn');
const fs = require('fs');
const path = require('path');
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
const getOneUserById = function (id, callback) {
  const userData = profileTable.find(id);
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};
const deleteData = async function (id, callback) {
  try {
    const deletedData = await profileTable.findByIdAndRemove(id);

    if (!deletedData) {
      throw new Error('Data not found');
    }

    // Remove images from the upload folder
    if (deletedData.multipalPhoto && deletedData.multipalPhoto.length > 0) {
      deletedData.multipalPhoto.forEach((filename) => {
        const imagePath = path.join(__dirname, '..', 'Uploads', 'user_img', filename);
        fs.unlinkSync(imagePath);
      });
    }
    if (deletedData.PoliticanPhoto && deletedData.PoliticanPhoto.length > 0) {
      deletedData.PoliticanPhoto.forEach((filename) => {
        const imagePath = path.join(__dirname, '..', 'Uploads', 'user_img', filename);
        fs.unlinkSync(imagePath);
      });
    }
    if (deletedData.PoliticalPartylogo && deletedData.PoliticalPartylogo.length > 0) {
      deletedData.PoliticalPartylogo.forEach((filename) => {
        const imagePath = path.join(__dirname, '..', 'Uploads', 'user_img', filename);
        fs.unlinkSync(imagePath);
      });
    }
    return callback(deletedData);
  } catch (err) {
    throw err;
  }
};

const updateData = async function (id, data) {
  try {
    const updatedData = await profileTable.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedData;
  } catch (error) {
    throw error;
  }
};
// Assume your crudModel has a method like this:
const findUser = async function (query) {
  try {
  const existingData = await profileTable.findOne(query);
  return existingData;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createData,
  getAllUser,
  getOneUserById,
  deleteData,
  updateData,
  findUser
}