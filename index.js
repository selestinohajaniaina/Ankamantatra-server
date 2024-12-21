const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Environement = require('./env');
const { sequelize } = require('./models');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const categoryRoutes = require('./routes/category');
const ankamantatraRoutes = require('./routes/ankamantatra');
const authentication = require('./middleware');
const port = new Environement().PORT;
const app = express();

sequelize.authenticate()
.then(() => console.log('Connexion à la base de données réussie'))
.catch(err => console.error('Erreur de connexion à la base de données :', err));

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/category', categoryRoutes);
app.use('/ankamantatras', ankamantatraRoutes);

app.post('/token', authentication, (req, res, next) => {
    res.send({data: req.body});
})

app.listen(port, console.log(`server run in ${port}`));