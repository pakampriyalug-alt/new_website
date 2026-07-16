const express = require("express");
const router = express.Router();


const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/categorycontroller");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


router.post("/adduser", upload.single("image"), addUser);
router.put("/updateuser/:id", upload.single("image"), updateUser);

router.get("/viewuser", getUsers);

router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
