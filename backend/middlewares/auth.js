const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserModels");

// auth

exports.auth = async (req, res, next) => {
  try {
    //console.log("extracting token");
    const token = req.header("Authorization").replace("Bearer ", "");
    //console.log(token);
    //console.log("After token extraction.....");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Access denied, token missing",
      });
    }

    // verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "token is invalid",
        error: err.message,
      });
    }

    next();
  } catch (err) {
    //console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "This is protected routes for students only.",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified as student.",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This is protected routes for Admin only.",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified as Admin.",
    });
  }
};
