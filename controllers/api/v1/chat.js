const Message = require('../../../models/Message');
const User = require('../../../models/User');

const getAllMessages = (req, res, next) => {
    let currentUser = req.user.username;

    Message.find({
        $or: [{ "sender": currentUser }, { "receiver": currentUser }]
    }, (err, docs) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't get your Models."
            });
        }

        // Give appropriate message if the user has no transactions
        // if(docs === []){
        //     res.json({
        //         "status": "error",
        //         "message": "We didn't find any Messages you were a part of."
        //     });
        // }

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

    const message = new Message({
        sender: sender,
        content: content,
        time_sent: time_sent
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

const getLeaderboard = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't get the leaderboard."
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
    }).sort({ coins: 'desc' });
}


module.exports.getAllMessages = getAllMessages;
module.exports.getChatroom = getChatroom;
module.exports.sendMessage = sendMessage;
module.exports.getLeaderboard = getLeaderboard;