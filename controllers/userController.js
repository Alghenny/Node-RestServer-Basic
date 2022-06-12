const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const getUsers = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true }

    // const users = await User.find(query)
    //     .skip(from)
    //     .limit(limit);

    // const total = await User.countDocuments(query);

    const [ total, user ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(from)
            .limit(limit)
    ])

    res.json({ total, user });
};

const postUsers = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //encrypt pwd
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save on DB
    await user.save();

    res.json(user);
}

const putUsers = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //Validate in DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
}

const deleteUsers = async(req, res = response) => {

    const {id} = req.params;

    //Delete from DB
    // const user = await User.findByIdAndDelete( id );

    //Set the user Status to false
    const user = await User.findByIdAndUpdate( id, {status: false});

    res.json(user);
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}