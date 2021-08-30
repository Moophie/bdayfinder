const Transfer = require('../../../models/Transfer');
const User = require('../../../models/User');

const getAllMessages = (req, res, next) => {
    let currentUser = req.user.username;

    Transfer.find({
        $or: [{ "sender": currentUser }, { "receiver": currentUser }]
    }, (err, docs) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't get your transfers."
            });
        }

        // Give appropriate message if the user has no transactions
        // if(docs === []){
        //     res.json({
        //         "status": "error",
        //         "message": "We didn't find any transfers you were a part of."
        //     });
        // }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "transfers": docs
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
    let receiver = req.body.receiver;
    let amount = parseInt(req.body.amount);
    let reason = req.body.reason;
    let comment = req.body.comment;

    const transfer = new Transfer({
        sender: sender,
        receiver: receiver,
        amount: amount,
        reason: reason,
        comment: comment,
    });

    User.findOne({
        "username": sender
    }, (err, sender) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't find the sender."
            });
        }

        if (!err) {
            if (sender.coins >= amount) {
                transfer.save((err, doc) => {
                    if (err) {
                        res.json({
                            "status": "error",
                            "message": "Could not save this transfer."
                        });
                    }

                    if (!err) {
                        let newCoins = sender.coins - amount;
                        User.findOneAndUpdate({ "username": sender.username }, { coins: newCoins }, (err, sender) => {
                        });

                        User.findOne({
                            "username": receiver
                        }, (err, receiver) => {
                            if (err) {
                                res.json({
                                    "status": "error",
                                    "message": "We couldn't find the receiver."
                                });
                            }

                            if (!err) {
                                let newCoins = receiver.coins + amount;
                                User.findOneAndUpdate({ "username": receiver.username }, { coins: newCoins }, (err, receiver) => {
                                });
                            }
                        });

                        res.json({
                            "status": "success",
                            "data": {
                                "transfer": doc
                            }
                        });
                    }
                })
            } else {
                // Send message that amount is insufficient
            }
        }
    });
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