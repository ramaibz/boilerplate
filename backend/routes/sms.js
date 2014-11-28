require('../controller/sms.js');

module.exports = function(app) {
    app.get('/sms', function(req, res) {
        res.render('views/sms.html');
    })
    app.post('/api/sms/', sendSMS);
}