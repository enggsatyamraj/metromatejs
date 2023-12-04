const User = require('../models/UserModels');

exports.getAllDetailsOfAProfile = async(req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").populate("history").exec();

        return res.status(200).json({
            success : true,
            message : "All data of an user is fetched successfuly.",
            userDetails,
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "error in gettin g all the details of a profile",
            error:err,
        })
    }
}