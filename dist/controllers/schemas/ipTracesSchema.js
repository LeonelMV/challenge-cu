"use strict";
const express_validator_1 = require("express-validator");
const commons_1 = require("../../commons");
module.exports = [
    (0, express_validator_1.check)('ip')
        .exists()
        .withMessage('IP is required')
        .notEmpty()
        .withMessage('IP cannot be empty')
        .custom((value, { req }) => commons_1.utils.validateIPaddress(value))
        .withMessage('Invalid IP'),
];
