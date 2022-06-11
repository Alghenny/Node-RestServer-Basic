
const { Router } = require('express');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/userController');

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', postUsers);

router.delete('/', deleteUsers);

module.exports = router;