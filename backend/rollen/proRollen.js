import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const SECRET_KEY = 'supersecretkey'; // Sollte in einer sicheren Umgebung gespeichert werden

// Beispiel für Benutzer
const users = [
    { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
    { id: 2, username: 'user', password: 'userpass', role: 'user' }
];

// Beispiel für Produkte
let products = [
    { id: 1, name: 'Produkt 1', price: 10 },
    { id: 2, name: 'Produkt 2', price: 20 }
];

// Middleware für Authentifizierung
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token ungültig
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Kein Token vorhanden
    }
};

// Middleware für Autorisierung (nur Admins dürfen zugreifen)
const authorizeAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403); // Zugriff verweigert
    }
};


// Produktliste (zugänglich für user und admin)
app.get('/products', authenticateJWT, (req, res) => {
    res.json(products);
});

// Produkt hinzufügen (nur admin)
app.post('/products', authenticateJWT, authorizeAdmin, (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Produkt löschen (nur admin)
app.delete('/products/:id', authenticateJWT, authorizeAdmin, (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter(product => product.id !== productId);
    res.sendStatus(204);
});

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

// app.listen(3000, '0.0.0.0', () => {
//     console.log('Server läuft auf Port 3000');
//   });
  