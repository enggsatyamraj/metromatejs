const History = require('../models/HistoryModels');
const User = require('../models/UserModels');

exports.deleteHistory = async(req,res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User Not Found",
            })
        }

        // deleting the history entries;
        await History.deleteMany({_id:{$in:user.history}})

        user.history = [];

        await user.save();

        return res.status(200).json({
            success : true,
            message : "All your History is deleted."
        })

    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Error in deleting the history",
            error : err.message,
        })
    }
}