const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generate_jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verify is the email exists
        const user = await User.findOne({ email });
        if( !user ) return res.status(400).json({
            msg:'The Email or the Password was incorrect - mail'
        });

        //Verify is the user is active
        if( !user.status ) return res.status(400).json({
            msg:'The Email or the Password was incorrect - status'
        });
        
        //Verify the password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if( !validPassword ) return res.status(400).json({
            msg:'The Email or the Password was incorrect - password'
        });

        //Generate the JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Contact the admin"
        })
    }

}

module.exports = {
    login
}