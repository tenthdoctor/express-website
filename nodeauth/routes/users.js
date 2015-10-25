var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users register */
router.get('/register', function(req, res, next) {
  res.render('register',{
    'title': 'Register'
  });
});

/* GET users login */
router.get('/login', function(req, res, next) {
  res.render('login',{
    'title': 'Login'
  });
});

/* GET users register post */
router.post('/register', function(req, res, next){
  // Get the Form Values
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  console.log(req.body);
  console.log(req.files);

  /*
  // Check for image field
  if(req.files.singleInputFileName){
    console.log('Uploading File ...');
    // File Info
    var profileImageOriginalName    = req.files.singleInputFileName.originalname;
    var profileImageName            = req.files.singleInputFileName.name;
    var profileImageMime            = req.files.singleInputFileName.mimetype;
    var profileImagePath            = req.files.singleInputFileName.path;
    var profileImageExt            = req.files.singleInputFileName.extensions;
    var profileImageSize            = req.files.singleInputFileName.size;
  } else {
    var profileImageName = 'noimage.png';
  }
*/
  // Form Validation
  req.checkBody('name', 'Name Field is Required').notEmpty();
  req.checkBody('email', 'Email Field is Required').notEmpty();
  req.checkBody('email', 'Email Not Valid').isEmail();
  req.checkBody('username', 'Username Field is Required').notEmpty();
  req.checkBody('password', 'Password Field is Required').notEmpty();
  req.checkBody('password2', 'Password Do Not Match').equals(req.body.password);


  // Check for errors
  var errors = req.validationErrors;

  if(errors) {
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
//      singleInputFileName: profileImageName
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
        console.log(user);
    });

    //Success Message
    req.flash('success', 'You are now registered and may login');

    res.location('/');
    res.redirect('/');
  }

});


module.exports = router;
