
const multer = require("multer");

// multer diskstoreage on the image path of the storage.
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'./Uploads/user_img/');
        // cb(null,'/home/ubuntu/homeautomation/Uploads/Profile_img/');
    },
    filename: (req, file, cb)=>{
        // cb(null, `${file.originalname}`);
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 10
    },
    fileFilter:fileFilter
});

module.exports = upload;