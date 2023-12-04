const User = require('../models/UserModels');
const additionalProfile = require('../models/ProfileModels');
const history = require('../models/HistoryModels')
exports.deleteAccount = async(req,res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        await history.deleteMany({ _id: { $in: user.history } });

        await additionalProfile.findByIdAndDelete(user.additionalDetails);
        await User.findByIdAndDelete(id);
        return res.status(200).json({
            success : true,
            message : "Your account has deleted."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Error in deleting the account, try gain later.",
            error :  err.message,
        })
    }
}