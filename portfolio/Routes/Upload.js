const router = require('express').Router();
const upload = require('../Controllers/MulterConfig');
const model = require('../Db/Models/Uploads');

router.post('/', upload.fields([{ name: 'userImage', maxCount: 1 }, { name: 'workImage', maxCount: 1 }]), async (req, res, next) => {
  try {
    // Create the data object
    const data = {
      profession: req.body.profession,
      aadhar: req.body.aadhar,
      work: req.files['workImage'][0].filename, // Change this line
      workpath: `C:/Users/Aryav Jain/Desktop/Hackathon/codecell/vendor/public/images/${req.files['workImage'][0].filename}`,
      desc: req.body.desc,
      filename: req.files['userImage'][0].filename,
      path: `C:/Users/Aryav Jain/Desktop/Hackathon/codecell/vendor/public/imgs/${req.files['userImage'][0].filename}`,
    };

    // Save the data to the database
    await model(data).save();
    
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "internal server error" });
  }
});

module.exports = router;
