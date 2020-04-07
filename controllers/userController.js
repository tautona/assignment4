const multer = require('multer');

// configure disk storage for files handled by multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});



module.exports.storage = storage;
