import User from "../models/user.modal.js"

export const getUsersForSidebar = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error occured in the getUsersForSidebar controller : ", error.message)
        res.status(500).json({
            error : "internal server error"
        })  
    }
}  