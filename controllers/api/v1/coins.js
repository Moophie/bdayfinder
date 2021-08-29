const Transfer = require('../../../models/Transfer');

const getAllTransfers = (req, res, next) => {
    Transfer.find({
        "sender": req.body.sender
    }, (err, docs) => {

        console.log(docs);
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

const getOneTransfer = (req, res) => {
    let id = req.params.id;

    res.json({
        status: 'succes',
        data: {
            message: `Getting transfer with id ${id}`
        }
    })
}

const postTransfer = (req, res, next) => {
    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let amount = req.body.amount;

    const transfer = new Transfer({
        sender: sender,
        receiver: receiver,
        amount: amount
    });

    transfer.save((err, doc) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "Could not save this transfer."
            });
        }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "transfer": doc
                }
            });
        }
    })
};

const getLeaderboard = (req, res) => {
    res.json({
        status: 'succes',
        data: {
            message: `Showing leaderboard`
        }
    })
}


module.exports.getAllTransfers = getAllTransfers;
module.exports.getOneTransfer = getOneTransfer;
module.exports.postTransfer = postTransfer;
module.exports.getLeaderboard = getLeaderboard;