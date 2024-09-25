export const signinValidation = [
    body('email')
      .isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      .normalizeEmail(),
    
    body('password')
      .not().isEmpty().withMessage('Das Passwort ist erforderlich'),
  ];
  
  export const validateSignin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  