const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
let AeSchema = new Schema({
    week1 : {type:String}
});

let ParticipantSchema = new Schema({
    uniqueID : {type:String},
    aeLog : [AeSchema]
});

let Slaes = new Schema({
    project_description: {type:String},
    ae_description: {type:String},
    participant: [ParticipantSchema]
});

module.exports = mongoose.model('Slaes', Slaes);
// module.exports = mongoose.model('ParticipantSchema', ParticipantSchema);
// module.exports = mongoose.model('AeSchema', AeSchema);

// export the new Schema so we could modify it using Node.js
