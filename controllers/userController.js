const { response, request } = require('express');


const getUsers = (req = request, res = response) => {

    const { name = '', q } = req.query;

    res.json({
        msg: 'get API - controller',
        name,
        q
    })
};

const postUsers = (req, res = response) => {

    const { name, id } = req.body;

    res.json({
        msg: 'post API - controller',
        name,
        id
    })
}

const putUsers = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - controller',
        id
    })
}

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}