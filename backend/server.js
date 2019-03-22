const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const slaesRoutes = express.Router();
const PORT = 4000;
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()


let Slaes = require('./data');

// this is our MongoDB database
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/slaes', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format

slaesRoutes.route('/').get(function(req, res) {
    Slaes.find(function(err, slaes) {
        if (err) {
            console.log(err);
        } else {
            res.json(slaes);
        }
    });
});

slaesRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Slaes.findById(id, function(err, slaes) {
        res.json(slaes);
    });
});


slaesRoutes.route('/update/:id').post(function(req, res) {
    Slaes.findById(req.params.id, function(err, slaes) {
        if (!slaes)
            res.status(404).send("data is not found");
        else
            slaes.project_description = req.body.project_description;
            slaes.ae_description = req.body.ae_description;
            slaes.save().then(slaes => {
                res.json('Slaes updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

slaesRoutes.route('/add').post(function(req, res) {
    let slaes = new Slaes(req.body);
    slaes.save()
        .then(slaes => {
            res.status(200).json({'slaes': 'slaes added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new slaes failed');
        });
});

app.use('/slaes', slaesRoutes);

// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====

// launch our backend into a port
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
