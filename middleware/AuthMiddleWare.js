const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, 'TylersSecretshhhhh', (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

// check for current user
const checkUser =  (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'TylersSecretshhhhh', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next();
            } 
            try { 
                const user = await User.findById(decodedToken.id).exec()
                res.locals.user = user
                next();   
            } catch(err) {
                res.status(400).json({error: err.message});
            }
        }) 
    } else {
        res.locals.user = null;
    }
}

module.exports = {
    requireAuth,
    checkUser
}