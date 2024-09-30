import { body, validationResult } from 'express-validator';

export const signupValidation = [
  body('username')
    .isLength({ min: 3, max: 16 }).withMessage('Der Benutzername muss zwischen 3 und 16 Zeichen lang sein')
    .trim()
    .not().isEmpty().withMessage('Der Benutzername ist erforderlich'),
  
  body('email')
    .isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein')
    .normalizeEmail(),
  
    body('password')
    .isLength({ min: 8, max: 16 }) 
    .withMessage('Das Passwort muss zwischen 8 und 32 Zeichen lang sein')
    .not().isEmpty().withMessage('Das Passwort ist erforderlich'),
  
];

export const signinValidation = [
  body('email')
    .isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein')
    .normalizeEmail(),
  
  body('password')
    .not().isEmpty().withMessage('Das Passwort ist erforderlich'),
];

export const validateSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};


export const validateSignin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
