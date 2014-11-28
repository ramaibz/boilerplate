'use strict';

var prf = 'Nodame: ';

// INIT
    var express = require('express'),
    bodyParser  = require('body-parser'),
    session     = require('express-session'),
    cookies     = require('cookie-parser'),
    flash       = require('connect-flash'),
    mongoose    = require('mongoose'),    
    passport    = require('passport'),
    morgan      = require('morgan'),    
    helmet      = require('helmet');

var dbConfig = require('./config/db.js');

var app         = express();

// SECURITY
app.use(helmet());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('port', process.env.PORT || 8800);
app.set('views', __dirname + '/dist/');
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/js', express.static(__dirname + '/dist/js'));

app.use(express.static(__dirname + '/dist'));

app.use(cookies('C0oKi3SP4rs3R', { httpOnly: true, secure: true }));
app.use(session({ 
    secret: '5E5SiONS3c12eT',
    resave: true,
    saveUninitialized: true 
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

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

// BACKEND ROUTING
require('./config/passport.js')(passport);
require('./backend/routes/routes.js')(app, passport);
require('./backend/routes/user.js')(app);
require('./backend/routes/article.js')(app);
require('./backend/routes/sms.js')(app);

// SERVER LISTEN
var server = app.listen(app.get('port'), function() {
    console.log(prf + 'Hello, you\'re at port ' + server.address().port );
});
