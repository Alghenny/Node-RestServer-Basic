const validateFields = require('./validate_fields');
const validateJWT = require('./validate_jwt');
const validateRoles = require('./validate_roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
}