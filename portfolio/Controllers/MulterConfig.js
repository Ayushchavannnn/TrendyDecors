const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../../Interior-master/public/imgs');
    cb(null, destinationPath);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
