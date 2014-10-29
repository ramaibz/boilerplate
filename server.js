'use strict';

var prf = 'Nodame: ';

// INIT
    var express = require('express'),
    app         = express(),
    router      = express.router,
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    session     = require('express-session'),
    cookies     = require('cookie-parser'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    flash       = require('connect-flash'),
    helmet      = require('helmet');

var dbConfig = require('./config/db.js');


// SECURITY
app.use(helmet());

app.set('port', process.env.PORT || 8800);
app.set('views', __dirname + '/dist/');
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/js', express.static(__dirname + '/dist/js'));

app.all('/administrasi/*', function(req, res, next) {
    res.sendFile('views/admin.html', { root: __dirname + '/dist' });
});
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/dist'));
app.use(cookies());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(flash());
app.use(session({ 
    secret: '5E5SiONS3c12eT',
    resave: true,
    saveUninitialized: true 
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// CONNECT DB
mongoose.connect(dbConfig.url, function(err, res) {
    if(err) {
        console.log(prf + 'Check your database environment')
    }
    else {
        console.log(prf + 'Connected to database ' + dbConfig.url);
    }
});
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Database connected');
});*/

// BACKEND ROUTING
require('./backend/routes/routes.js')(app, passport);
require('./backend/routes/user.js')(app);

// SERVER LISTEN
var server = app.listen(app.get('port'), function() {
    console.log(prf + 'Hello, you\'re at port ' + server.address().port );
});
