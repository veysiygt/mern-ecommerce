const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userDetail,
} = require("../controllers/user");
const { authenticationMid } = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/register", upload.single('avatar'), register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/reset/:token", resetPassword);
router.get("/me", authenticationMid, userDetail);

module.exports = router;