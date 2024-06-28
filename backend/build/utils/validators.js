"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompletionValidator = exports.signupValidator = exports.loginValidator = void 0;
exports.validate = validate;
const express_validator_1 = require("express-validator");
const constants_js_1 = require("../constants/constants.js");
const user_handler_js_1 = require("../controllers/user-handler.js");
/**
 * Creates and returns an Express middleware that runs a series of validation checks.
 *
 * @param {ValidationChain[]} validations - An array of validation chain instances.
 * @returns {Function} An Express middleware function that processes validations and handles errors.
 */
function validate(validations) {
    const runValidations = async function (req, res, next) {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        else {
            const error = new Error(constants_js_1.ERROR.VALIDATION.FAILED);
            error.name = constants_js_1.ERROR.VALIDATION.ERROR_NAME;
            error.message = JSON.stringify(errors.array());
            return (0, user_handler_js_1.sendErrorResponse)(res, error, 422);
        }
    };
    return runValidations;
}
/**
 * Validation rules for logging in.
 * Ensures that the email is a valid email format and that the password meets the minimum length requirement.
 */
exports.loginValidator = [
    (0, express_validator_1.body)(constants_js_1.FORM_FIELD.EMAIL).trim().isEmail().withMessage(constants_js_1.ERROR.VALIDATION.EMAIL),
    (0, express_validator_1.body)(constants_js_1.FORM_FIELD.PASSWORD)
        .trim()
        .isLength({ min: constants_js_1.PASSWORD_MIN_LENGTH })
        .withMessage(constants_js_1.ERROR.VALIDATION.PASSWORD),
];
/**
 * Validation rules for signing up.
 * Includes all validations from `loginValidator` and adds a check for the name field to ensure it is not empty.
 */
exports.signupValidator = [
    (0, express_validator_1.body)(constants_js_1.FORM_FIELD.NAME).notEmpty().withMessage(constants_js_1.ERROR.VALIDATION.NAME),
    ...exports.loginValidator,
];
/**
 * Validation rules for chat message completion.
 * Ensures that the message field is not empty.
 */
exports.chatCompletionValidator = [
    (0, express_validator_1.body)(constants_js_1.FORM_FIELD.MSG).notEmpty().withMessage(constants_js_1.ERROR.VALIDATION.MSG),
];
//# sourceMappingURL=validators.js.map