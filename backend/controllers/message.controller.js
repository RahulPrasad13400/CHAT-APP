import Conversation from "../models/conversation.modal.js"
import Message from "../models/message.modal.js"

export const sendMessage = async (req, res) => {
    try {
        const {id : receiverId} = req.params
        const {message} = req.body
        const senderId = req.user._id

        // To check whether they have already messaged each other 
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]}
        })
        // if they haven't messaged each other create a new conversation
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()

        // above lines are replaced by this, because it will run in parallel and gives more performance
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error occured in the sendMessage controller : ", error.message)
        res.status(500).json({
            error : "internal server error"
        })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id : userToChatId } = req.params
        const senderId = req.user._id
        
        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate("messages")

        if(!conversation){
            return res.status(200).json([])
        }

        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log("Error occured in the sendMessage controller : ", error.message)
        res.status(500).json({
            error : "internal server error"
        })        
    }
}