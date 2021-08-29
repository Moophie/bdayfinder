const Transfer = require('../../../models/Transfer');

const getAllTransfers = (req, res) => {
    res.json({
        status: 'succes',
        data: {
            message: `Getting all transfers`
        }
    })
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

    transfer.save(() => {
        res.json({
            "status": "success",
        })
    });
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