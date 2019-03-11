const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const slaesRoutes = express.Router();
const PORT = 4000;

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

// launch our backend into a port
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
