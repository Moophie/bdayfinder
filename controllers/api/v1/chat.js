const Message = require('../../../models/Message');
const User = require('../../../models/User');

const getAllMessages = (req, res, next) => {
    Message.find((err, docs) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't get your messages."
            });
        }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "messages": docs
                }
            });
        }
    });
}

const getMessagesByChatroom = (req, res) => {
    Message.find({"chatroom_birthday": req.body.chatroomBirthday}, (err, messages) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't get your messages."
            });
        }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "messages": messages
                }
            });
        }
    })
}

const getChatroom = (req, res) => {
    User.find({
        "birthday": req.params.birthday
    }, (err, users) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't find users with the same birthday."
            });
        }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "users": users
                }
            });
        }
    });
}

const sendMessage = (req, res, next) => {
    let sender = req.user.username;
    let content = req.body.content;
    let time_sent = req.body.time_sent;
    let chatroom_birthday = req.user.birthday;

    const message = new Message({
        sender: sender,
        content: content,
        time_sent: time_sent,
        chatroom_birthday: chatroom_birthday
    });

    message.save((err, doc) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "Could not save this message."
            });
        }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "message": doc
                }
            });
        }
    })
};

module.exports.getAllMessages = getAllMessages;
module.exports.getMessagesByChatroom = getMessagesByChatroom;
module.exports.getChatroom = getChatroom;
module.exports.sendMessage = sendMessage;