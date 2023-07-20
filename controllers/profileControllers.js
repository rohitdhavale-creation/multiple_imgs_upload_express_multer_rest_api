var crudModel = require('../models/profileSchema');

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
  




module.exports = {
    // userForm,
    createData,
    getAllUser,
    getOneUserById
}