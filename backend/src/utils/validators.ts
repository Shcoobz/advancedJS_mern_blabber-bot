import { Request, Response, NextFunction } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';
import { ERROR, FORM_FIELD, PASSWORD_MIN_LENGTH } from '../constants/constants.js';
import { sendErrorResponse } from '../controllers/user-handler.js';

/**
 * Creates and returns an Express middleware that runs a series of validation checks.
 *
 * @param {ValidationChain[]} validations - An array of validation chain instances.
 * @returns {Function} An Express middleware function that processes validations and handles errors.
 */
export function validate(validations: ValidationChain[]) {
  const runValidations = async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    } else {
      const error = new Error(ERROR.VALIDATION.FAILED);
      error.name = ERROR.VALIDATION.ERROR_NAME;
      error.message = JSON.stringify(errors.array());

      return sendErrorResponse(res, error, 422);
    }
  };

  return runValidations;
}

/**
 * Validation rules for logging in.
 * Ensures that the email is a valid email format and that the password meets the minimum length requirement.
 */
export const loginValidator = [
  body(FORM_FIELD.EMAIL).trim().isEmail().withMessage(ERROR.VALIDATION.EMAIL),
  body(FORM_FIELD.PASSWORD)
    .trim()
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(ERROR.VALIDATION.PASSWORD),
];

/**
 * Validation rules for signing up.
 * Includes all validations from `loginValidator` and adds a check for the name field to ensure it is not empty.
 */
export const signupValidator = [
  body(FORM_FIELD.NAME).notEmpty().withMessage(ERROR.VALIDATION.NAME),
  ...loginValidator,
];

/**
 * Validation rules for chat message completion.
 * Ensures that the message field is not empty.
 */
export const chatCompletionValidator = [
  body(FORM_FIELD.MSG).notEmpty().withMessage(ERROR.VALIDATION.MSG),
];
