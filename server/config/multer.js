const multer = require("multer");

const PRODUCTS_DIR = "./uploads/products/"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PRODUCTS_DIR)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/webp") {
        cb(null, true);
    } else {
        cb({ messsage: "We only suppport .webp images for site optimzation and performance" }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 512 * 512 } /* 512 x 512 stands for kbs */,
    fileFilter: fileFilter
})


module.exports = upload;