const express = require("express");
const router = express.Router();

const { login, signup, changePassword } = require("../controller/auth");
const { auth } = require("../middlewares/auth");
const {
  addProfileDetails,
  updateProfileDetails,
  updateProfile,
} = require("../controller/profileAdd");
const {
  getAllDetailsOfAProfile,
} = require("../controller/getAllDetailsofAProfile");
const { pathController } = require("../controller/pathController");
const { deleteAccount } = require("../controller/deleteAccount");
const { deleteHistory } = require("../controller/deleteHistory");
router.post("/login", login);
router.post("/signup", signup);
router.post("/additionaldetails", auth, addProfileDetails);
router.post("/updateadditionaldetails", auth, updateProfileDetails);
router.post("/updateProfile",auth,updateProfile)
router.get("/getalldetailsofaprofile", auth, getAllDetailsOfAProfile);
router.delete("/deleteaccount", auth, deleteAccount);
router.delete("/deletehistory", auth, deleteHistory);
router.post("/stations", auth, pathController);
router.post("/changepassword", changePassword);
module.exports = router;
