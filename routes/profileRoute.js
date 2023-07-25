var express = require('express');
var router = express.Router();
const upload = require("../middleware/userImg");


var userController= require('../controllers/profileControllers');

router.post('/register', upload.fields([
    { name: 'multipalPhoto', maxCount: 3 },
    { name: 'PoliticanPhoto', maxCount: 2 },
    { name: 'PoliticalPartylogo', maxCount: 4 }
  ]),userController.createData);

router.get('/getAllRegisterUser',userController.getAllUser)
router.get('/getOneUserById/:id',userController.getOneUserById)
router.delete('/deleteOneUserById/:id', userController.deleteData);
router.put('/updateOneUserById/:id',  upload.fields([
  { name: 'multipalPhoto', maxCount: 3 },
  { name: 'PoliticanPhoto', maxCount: 2 },
  { name: 'PoliticalPartylogo', maxCount: 4 }
]), userController.updateData);

module.exports = router;