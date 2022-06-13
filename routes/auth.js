const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate_fields');

const { login } = require('../controllers/authController');

const router = Router();

router.post('/login', [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validateFields
], login );

module.exports = router;