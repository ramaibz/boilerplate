// Twilio Credentials 
var accountSid = 'AC32fd7f0f97917bf14037327f70fdbf3d'; 
var authToken = '792d0cae6a7cb1b75dc9b632d012e0c1'; 

var client = require('twilio')(accountSid, authToken);

sendSMS = function(req, res) {
    client.sendMessage({
        to: req.body.recipient,
        from: "+19285516331",
        body: req.body.content
    }, function(error, message) {
        if(error) {
            console.log(error);
            res.send({ error: error });
        }
        else {
            console.log(message);
            res.send({ success: message.sid });
        }
    })
}

