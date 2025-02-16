// multer-config.js
import multer from "multer";
import path from "path";

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set upload destination directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set filename as current timestamp + original extension
  },
});

const upload = multer({ storage }).single("imageUrl");

export { upload };
