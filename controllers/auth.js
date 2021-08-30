const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwt_decode = require('jwt-decode');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let birthday = req.body.birthday;

    const user = new User({
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        birthday: birthday
    });

    let currentBirthday = user.birthday;

    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, process.env.jwtsecret || config.get('jwt.secret'));

        res.json({
            "status": "success",
            "data": {
                "token": token,
                "currentBirthday": currentBirthday
            }
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        if (!result.user) {
            return res.json({
                "status": "failed",
                "message": "Login failed."
            })
        }

        let currentBirthday = result.user.birthday;

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, process.env.jwtsecret || config.get('jwt.secret'));

        res.json({
            "status": "success",
            "data": {
                "token": token,
                "currentBirthday": currentBirthday
            }
        })
    }
    ).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};

const getUserFromToken = (req, res) => {
    let token = req.body.token;
    let decodedToken = jwt_decode(token);

    User.findOne({
        "_id": decodedToken.uid
    }, (err, user) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't find the user."
            });
        }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "user": user
                }
            });
        }
    });
};

const getAllUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't get the users."
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

const getUsersByBirthday = (req, res) => {
    User.find({ "birthday": req.body.birthday }, (err, users) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "We couldn't get the users."
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


module.exports.signup = signup;
module.exports.login = login;
module.exports.getUserFromToken = getUserFromToken;
module.exports.getAllUsers = getAllUsers;
module.exports.getUsersByBirthday = getUsersByBirthday;