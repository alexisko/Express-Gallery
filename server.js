// PACKAGES
const express = require('express');
const exphbs = require('express-handlebars');
const mo = require('method-override');
const bp = require('body-parser');

// DEV-CREATED FILES
const db = require('./models');

// FILES
const PORT = process.env.PORT || 8080;
const CONFIG = require('./config/config.json');

// EXPRESS
const app = express();

// DB
const { Gallery, User } = db;

// ROUTERS
const indexRouter = require('./routes/index.js');
const galleryRouter = require('./routes/gallery.js');
const userRouter = require('./routes/user.js');

// BODY-PARSER
app.use(bp.urlencoded({extended:true}));

// HANDLEBARS
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// METHOD-OVERRIDE
app.use(mo(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// PUBLIC STATIC FILES
app.use(express.static('public'));

// ROUTES
app.use('/', indexRouter);
app.use('/gallery', galleryRouter);
app.use('/user', userRouter);

// SERVER
const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`SERVER: Listening on ${PORT}`);
});