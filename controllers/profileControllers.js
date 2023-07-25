var crudModel = require('../models/profileSchema');
const fs = require('fs');
const path = require('path');

const createData = function (req, res) {
    var inputData = req.body;
    if (req.files) {
        // Extract filenames for each field
        Object.keys(req.files).forEach((fieldname) => {
            const files = req.files[fieldname];
            inputData[fieldname] = files.map((file) => file.filename);
        });
    }
    console.log(inputData);
  
    // // Perform the necessary operations with inputData
    // // For example, you can use a CRUD model to create the data
    crudModel.createData(inputData, function (data) {
      res.json({ "data": inputData });
      console.log("Record was created");
    });
  };
  
const getAllUser = function (req, res) {
    crudModel.getAllUser(function (data) {
      res.json({ "data": data });
    });
};
  
const getOneUserById = function (req, res) {
  let id = req.params.id;
    crudModel.getOneUserById({Id:id},function (data) {
      res.json({ "data": data });
    });
};


const deleteData = function (req, res) {
  const id = req.params.id; // Get the _id from the URL parameter
  crudModel.deleteData({_id:id},function (data) {
    res.json({ message: 'Data and associated images deleted successfully' });
  });
};
  

// const updateData = async function (req, res) {
//   const id = req.params.id; // Get the _id from the URL parameter
//   const inputData = req.body;

//   try {
//     if (req.files) {
//       // Extract filenames for each field
//       Object.keys(req.files).forEach((fieldname) => {
//         const files = req.files[fieldname];
//         inputData[fieldname] = files.map((file) => file.filename);
//       });
//     }

//     const updatedData = await crudModel.updateData(id, inputData);
//     res.json({ message: 'Data update success', updatedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update data' });
//   }
// };


const updateData = async function (req, res) {
  const id = req.params.id; // Get the _id from the URL parameter
  const inputData = req.body;

  if (req.files) {
    // Extract filenames for each field
    Object.keys(req.files).forEach((fieldname) => {
      const files = req.files[fieldname];
      inputData[fieldname] = files.map((file) => file.filename);
    });
  }

  try {
    // Get the existing data to compare with the updated data
   
    const existingData = await crudModel.findUser({_id:id});
    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // Delete previous images if updated
    if (existingData.multipalPhoto) {
      existingData.multipalPhoto.forEach((filename) => {
        if (!inputData.multipalPhoto.includes(filename)) {
          const imagePath = path.join(__dirname, '..', 'Uploads', 'user_img', filename);
          fs.unlinkSync(imagePath);
        }
      });
    }
    if (existingData.PoliticanPhoto) {
      existingData.PoliticanPhoto.forEach((filename) => {
        if (!inputData.PoliticanPhoto.includes(filename)) {
          const imagePath = path.join(__dirname, '..', 'Uploads', 'user_img', filename);
          fs.unlinkSync(imagePath);
        }
      });
    }
    if (existingData.PoliticalPartylogo) {
      existingData.PoliticalPartylogo.forEach((filename) => {
        if (!inputData.PoliticalPartylogo.includes(filename)) {
          const imagePath = path.join(__dirname, '..', 'Uploads', 'user_img', filename);
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Perform the update operation
    const updatedData = await crudModel.updateData(id, inputData);
        res.json({ message: 'Data update success1111', updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update data' });
  }
};

  




module.exports = {
    // userForm,
    createData,
    getAllUser,
    getOneUserById,
    deleteData,
    updateData
}