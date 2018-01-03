const addAthlete = require('./addAthlete');
const home = require('./home');
const profile = require('./profile');

module.exports = (app => {
    addAthlete(app),
    home(app),
    profile(app)
})