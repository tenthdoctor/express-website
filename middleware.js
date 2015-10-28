// Handle file Uploads & Multipart Data
app.use(multer({dest: './public/images/uploads'}));

// Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() +']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		}
	}
}));


// Connect-Flash
app.use(flash());
app.use(function(req, res, next) {
	res.locals.messages = require('express-messages')(req, res);
	next();
});

// Make our db accessible to our router
app.use(function(req, res, next){
	req.db = db;
	next();
});