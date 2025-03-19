const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

const SECRET_KEY = 'sua_chave_secreta_aqui';
const expiresIn = '1h';

// Criação do token
const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verificação do token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
};

// Login endpoint
server.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;
  const users = router.db.get('usuarios').value();
  const user = users.find(u => u.email === email && u.senha === senha);
  
  if (user) {
    const { senha, ...userWithoutPassword } = user;
    const accessToken = createToken(userWithoutPassword);
    res.json({ accessToken, user: userWithoutPassword });
  } else {
    res.status(401).json({ message: 'Email ou senha inválidos!' });
  }
});

// Check if user is admin
server.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const user = verifyToken(token);
      req.user = user;
    } catch (err) {
      console.log('Token inválido');
    }
  }
  next();
});

// Use default router
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server está rodando na porta 3000');
});