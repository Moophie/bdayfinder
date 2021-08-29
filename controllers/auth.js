const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const config = require('config');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let coins = 100;

    const user = new User({ 
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        coins: coins
    });

    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, process.env.jwtsecret || config.get('jwt.secret'));

        res.json({
            "status": "success",
            "data": {
                "token": token
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

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, process.env.jwtsecret || config.get('jwt.secret'));

        res.json({
            "status": "success",
            "data": {
                "token": token
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

module.exports.signup = signup;
module.exports.login = login;