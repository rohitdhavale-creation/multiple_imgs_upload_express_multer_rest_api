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
  




module.exports = {
    // userForm,
    createData,
}