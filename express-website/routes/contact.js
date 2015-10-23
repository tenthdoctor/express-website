/**
 * Created by doctor on 23/10/15.
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'thedumbjedi@gmail.com',
            pass: 'something'
        }
    });

    var mailOptions = {
        from: 'John Doe <johndoe@outlook.com>',
        to: 'Dumb Jedi <thedumbjedi@gmail.com>',
        subject: 'Website Submission',
        text: 'You have a Submission with the following Details ... Name: ' +req.body.name+' Email: ' +req.body.email+ 'Message: ' + req.body.message,
        html: '<p>You got a new Submission with the following details .. </p><ul><li>Name:' +req.body.name+'</li><li>Email: ' +req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'

    };

    transporter.sendMail(mailOptions, function(error, info){
       if(error) {
           console.log(error);
           res.redirect('/');
       }
       else {
           console.log('Message Sent: ' + info.response);
           res.redirect('/');
       }
    });
});

module.exports = router;
