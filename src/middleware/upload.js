const multer = require('multer');
const path = require('path');

const storageSetup = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const filderSetup = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
        return cb(null, true);
    } else {
        cb('Error: File upload only supports the following filetypes - ' + filetypes);
    }
}

const upload = multer({
    storage: storageSetup,
    fileFilter: filderSetup,
    limits: { fileSize: 1024 * 1024 * 2 }
})

module.exports = upload