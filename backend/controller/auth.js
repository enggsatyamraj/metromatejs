const bcrypt = require("bcrypt");
const User = require("../models/UserModels");
// const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/ProfileModels");
require("dotenv").config();

exports.signup = async (req, res) => {
  //console.log("signup endpoint reached");
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password and Confirm Password should match.",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "User already exited, Kindly Login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // creating the additional detials of the user
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in sign up, try again later.",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  //console.log("login endpoint reached.");
  try {
    const { email, password } = req.body;

    // checking email or password field is missing or not.
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory.",
      });
    }

    // ? finding user with provided email;
    const user = await User.findOne({ email })
      .populate("additionalDetails")
      .populate("history")
      .exec();
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are a new user, kindly sign in first.",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      //console.log("nnnnnnnnnnnnnnnnnnnnnnnn", user.token);
      user.password = undefined;

      // cookies wala kaam;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token,
        user,
        message: "Logged in successfully.",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Cannot logged in",
      error: err.message,
    });
  }
};

// exports.sendOtp = async(req,res) => {
//     try{
//         const {email} = req.body;
//         if(!email){
//             return res.status(403).json({
//                 success : false,
//                 message : "Email is required.",
//             })
//         }
//         const checkUserPresent = await User.findOne({email});
//         if(checkUserPresent){
//             return res.status(403).json({
//                 success : false,
//                 message : "Email is already registered.",
//             })
//         }
//         var otp = otpGenerator.generate(6,{
//             upperCaseAlphabets:false,
//             lowerCaseAlphabets:false,
//             specialChars:false,
//         });

//         const result = await OTP.findOne({otp:otp});
//         //console.log("Result is Generate OTP function.");
//         //console.log("OTP",otp);
//         //console.log("result",result);
//         while(result){
//             otp = otpGenerator.generate(6,{
//                 upperCaseAlphabets:false,
//                 lowerCaseAlphabets:false,
//                 specialChars:false,
//             });
//         }

//         const otpPayload = {email, otp};
//         const otpBody = await OTP.create(otpPayload);
//         //console.log("OTP body",otpBody);
//         return res.status(200).json({
//             success : true,
//             message : "OTP Generated successfully."
//         })
//     } catch(err){
//         return res.status(500).json({
//             success : false,
//             message : "Cannot generate OTP.",
//             error : err.message,
//         })
//     }
// }

exports.changePassword = async (req, res) => {
  try {
    var userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;
    // validating the old password;
    const isPasswordMatch = await bcrypt.compare(
      newPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect.",
      });
    }
    // update password
    const enxryptedPassword = await bcrypt.hash(newPassword, 10);
    userDetails = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { password: enxryptedPassword },
      { new: true }
    );

    // returning the success response
    return res.status(200).json({
      success: true,
      message: "Password changed Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in changing the Password.",
      error: err.message,
    });
  }
};
