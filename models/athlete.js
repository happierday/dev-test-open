const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const athlete = new Schema({
    firstName: {required: true, type: String, lowercase:true},
    lastName: {required: true, type: String, lowercase:true},
    fullName: {required: true, type: String, unique:true, lowercase:true},
    nationality: {required: true, type: String},
    association: {required: true, type: String},
    team: {required: true, type: String},
    gender: {required: true, type: String},
    sports: [],
    about: {required: true, type: String},
    img: {required: true, type: String}
});

module.exports = mongoose.model('athlete', athlete);