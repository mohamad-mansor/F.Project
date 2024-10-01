import csrf from 'csurf';
import cookieParser from 'cookie-parser';

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

// Use cookie parser to handle cookies
app.use(cookieParser());

// Add CSRF protection middleware
app.use(csrfProtection);

// Route to get the CSRF token (can be called from client-side to get a token for secure requests)
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});