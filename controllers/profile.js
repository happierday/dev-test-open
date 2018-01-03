const Athlete = require('../models/athlete');
const dataUriToBuffer = require('data-uri-to-buffer');

module.exports = ((router) => {
    router.get('/profile/:fullname',(req,res) => {
        Athlete.findOne({fullName: req.params.fullname},(err,data) => {
            if(err){
                console.log(err);
                res.json({success: false, msg: 'Unable to find the athlete!'})
            }
            res.json({data: data});
        })
    }),
    router.put('/profile/:fullname',(req,res) => {
        Athlete.findOne({fullName: req.params.fullname},(err,data) => {
            if(err) res.json({success: false, msg: "Can't Update!"})
            else{
                if(data){
                    
                    // joke.firstName = req.body.firstName;
                    // joke.lastName = req.body.lastName;
                    // joke.gender = req.body.gender;
                    // joke.nationality = req.body.nationality;
                    // joke.association = req.body.association;
                    // joke.team = req.body.team;
                    // joke.sports = req.body.sports;
                }
            }
        })
    })
})