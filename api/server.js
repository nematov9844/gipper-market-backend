const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Tokenni tekshirish uchun middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
    const validToken = "your-secret-token"; // Tokenni bu yerda o'zgartiring

    if (!token) {
        return res.status(401).json({ message: 'Token required' });
    }

    if (token !== validToken) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    next(); // Token to‘g‘ri bo‘lsa, keyingi middleware'ga o‘tadi
};

server.use(middlewares);

// Tokenni barcha API yo‘llariga qo‘llash
server.use('/api', verifyToken);

// URL'larni qayta yozish
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});

module.exports = server;
