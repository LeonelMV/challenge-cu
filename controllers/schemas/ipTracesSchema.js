const { check } = require('express-validator');
const { utils } = require('../../commons');

module.exports = [
    check('ip')
        .exists()
        .withMessage('IP is required')
        .notEmpty()
        .withMessage('IP cannot be empty')
        .custom((value, { req }) => utils.validateIPaddress(value))
        .withMessage('Invalid IP'),
];