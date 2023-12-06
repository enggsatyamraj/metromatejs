const User = require("../models/UserModels");
const additionalProfile = require("../models/ProfileModels");
const bcrypt = require("bcrypt");

exports.addProfileDetails = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, gender } = req.body;
    const id = req.user.id;

    const userDetails = await User.findById(id);
    const profile = await additionalProfile.findById(
      userDetails.additionalDetails
    );

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    // save and update profile
    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Additional Profile Added succesfully.",
      profile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in updating the profile",
      error: err.message,
    });
  }
};

exports.updateProfileDetails = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, gender } = req.body;
    const id = req.user.id;

    const userDetails = await User.findById(id);
    const profile = await additionalProfile.findByIdAndUpdate(
      { _id: userDetails.additionalDetails },
      { dateOfBirth, about, contactNumber, gender },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile additional details updated successfully.",
      profile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in updating the profile additional details",
      error: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNumber } = req.body;
    const id = req.user.id;
    const updateFields = {};

    // Check if fields are provided in the request body and add them to the updateFields object
    if (firstName) {
      updateFields.firstName = firstName;
    }
    if (lastName) {
      updateFields.lastName = lastName;
    }
    if (email) {
      updateFields.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }
    if (contactNumber) {
      updateFields.contactNumber = contactNumber;
    }

    // Generate the image URL based on the first name and last name
    const imageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;
    updateFields.image = imageUrl;
    //console.log("updated fields",updateFields);

    const userDetails = await User.findByIdAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    )
      .populate("additionalDetails")
      .populate("history")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUserDetails: userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in updating the profile",
      error: err.message,
    });
  }
};
