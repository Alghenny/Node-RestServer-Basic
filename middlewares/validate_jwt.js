const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'Unauthorized access'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY );

        const user = await User.findById(uid);

        if( !user ){
            return res.status(400).json({
                msg: 'Invalid token - user does not exist in DB'
            });
        }

        //verify is UID status is true
        if( !user.status ){
            return res.status(401).json({
                msg: 'Invalid token - user with false status'
            });
        }        

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }

}

module.exports = {
    validateJWT
}