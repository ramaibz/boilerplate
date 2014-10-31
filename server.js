'use strict';

var prf = 'Nodame: ';

// INIT
    var flash   = require('connect-flash'), 
    express     = require('express'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    session     = require('express-session'),
    cookies     = require('cookie-parser'),
    bodyParser  = require('body-parser'),
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

app.all('/admin/*', function(req, res, next) {
    res.render('views/admin.html');
});

app.use(express.static(__dirname + '/dist'));
app.use(cookies('C0oKi3SP4rs3R'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({ 
    secret: '5E5SiONS3c12eT',
    resave: true,
    saveUninitialized: true 
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

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
