const { Router } = require('express');
const { check } = require('express-validator');

// const { validateFields } = require('../middlewares/validate_fields');
// const { validateJWT } = require('../middlewares/validate_jwt');
// const { isAdmin, haveRole } = require('../middlewares/validate_roles');
const { validateFields,
        validateJWT,
        isAdmin,
        haveRole
    } = require('../middlewares/validate');

const { isRoleValid, emailExist, userExistById } = require('../helpers/db-validators');

const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/userController');

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
    check('id', 'Is not a valid Id').isMongoId(),
    check('id').custom( userExistById ),
    check('role').custom( isRoleValid ),
    validateFields
], putUsers);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password Must have more than 6 letters').isLength( {min: 6} ),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom( emailExist ),
    // check('role', 'The role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateFields
], postUsers);

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    haveRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Is not a valid Id').isMongoId(),
    check('id').custom( userExistById ),
    validateFields
], deleteUsers);

module.exports = router;