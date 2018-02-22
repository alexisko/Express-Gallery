// PACKAGES
const express = require('express');
const exphbs = require('express-handlebars');
const mo = require('method-override');
const bp = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const LocalStrategy = require('passport-local').Strategy;

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

// SESSION
app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SESSION_SECRET,
  name: 'express-session',
  cookie: {
    maxAge: 1000000
  },
  saveUninitialized: true
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    }).then((user) => {
      // password === comes from the client POST request
      // user.password === hashed password
      if(user !== null) {
        bcrypt.compare(password, user.password)
          .then(result => {
            if(result) {
              console.log('SUCESS: Username and password are correct!');
              return done(null, user);
            } else {
              console.log('ERROR: Password does not match!');
              return done(null, false, { message: 'ERROR: Incorrect Password'});
            }
          })
          .catch(err => {
            console.log('ERROR: ', err);
            return done(null, false, { message: 'Incorrect Username!' });
          });
      } else {
        throw 'User not found!';
      }
    })
    .catch((err) => {
      // user not found
      console.log('ERROR: ', err);
      return done(null, false, { message: 'Incorrect Username!' });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findOne({
    where: {
      id: userId
    }
  }).then((user) => {
    return done(null, {
      id: user.id,
      username: user.username
    });
  })
  .catch((err) => {
    done(err, user);
  });
});

// ROUTES
app.use('/', indexRouter);
app.use('/gallery', galleryRouter);
app.use('/user', userRouter);

// SERVER
const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`SERVER: Listening on ${PORT}`);
});