const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
let Slaes = new Schema({
    project_description: {
        type: String
    },
    ae_description: {
        type: String
    }
});

module.exports = mongoose.model('Slaes', Slaes);
// export the new Schema so we could modify it using Node.js
