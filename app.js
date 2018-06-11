

//  set up
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 2222;
var mongoose = require('mongoose');
var passport = require('passport');
var froala = require('froala-editor');
var flash    = require('connect-flash');
var path = require ('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var fs = require("formidable");
var upload_file = require("./apps/file_upload.js");
var upload_image = require("./apps/image_upload.js");
// var upload_file = require("./public/js/real.js");
var urlencodedParser = bodyParser.urlencoded({extended: false});


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.get('/', function (req, res) {
//     res.render('index.html')
// })

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

// configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static (path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// required for passport
app.use(session({secret: 'thisisrev', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.get('/', function (req, res) {
    res.render('index')
});

app.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('signupMessage') });
});

app.get('/login', (req, res) => {
    res.render('login',  { message: req.flash('loginMessage') });
});

// app.get('/login', function(req, res, next) {
//     passport.authenticate('local-login', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { return res.redirect('/login'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.redirect('/users/' + user.username);
//       });
//     })(req, res, next);
//   });

//PROFILE
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

//LOGOUT
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

     // process the signup form
    //  app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/profile', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect : '/profile', // redirect to the secure profile section
    //     failureRedirect : '/login', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

    app.post('/signup', urlencodedParser,
    passport.authenticate('local-signup', { successRedirect: '/',
                                     failureRedirect: '/signup',
                                     failureFlash: true })
                                     
  );

    app.post('/login', (req, res) => {
        res.redirect('/')
    }
    // passport.authenticate('local-login', { successRedirect: '/',
    //                                  failureRedirect: '/login',
    //                                  failureFlash: true })
  );

 //appD ccddceea31442f1dc7a02e607baac1a8

   // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 
        scope : ['public_profile', 'email']
      }));
  
      // handle the callback after facebook has authenticated the user
      app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/',
              failureRedirect : '/profile'
          }));
// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

// config/database.js
module.exports = {
    
        'url' : 'your-settings-here' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    
    };


     
// File POST handler.
app.post("/file_upload", function (req, res) {
    upload_file(req, function(err, data) {
   
      if (err) {
        return res.status(404).end(JSON.stringify(err));
      }
   
      res.send(data);
    });
  });
   
  // Image POST handler.
  app.post("/image_upload", function (req, res) {
    upload_image(req, function(err, data) {
   
      if (err) {
        return res.status(404).end(JSON.stringify(err));
      }
   
      res.send(data);
    });
  });
   
  // Create folder for uploading files.
//   var filesDir = path.join(path.dirname(require.main.filename), "uploads");
   
//   if (!fs.existsSync(filesDir)){
//     fs.mkdirSync(filesDir);
//   }
    
app.listen(port);
console.log('Server starting on ' + port);
