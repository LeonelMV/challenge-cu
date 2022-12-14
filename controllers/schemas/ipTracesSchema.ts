import { check } from 'express-validator';
import { utils } from '../../commons';

export = [
    check('ip')
        .exists()
        .withMessage('IP is required')
        .notEmpty()
        .withMessage('IP cannot be empty')
        .custom((value: any, { }) => utils.validateIPaddress(value))
        .withMessage('Invalid IP'),
];