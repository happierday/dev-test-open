const Athlete = require('../models/athlete');
const { param, body } = require('express-validator/check');
const helper = require('../helper/expressValidatorHelper')
const dataUriToBuffer = require('data-uri-to-buffer');
const awsServices = require('../services/AWSServices');
let regExp;

module.exports = ((router) => {
    router.post('/addathlete',
        [
            body('firstName')
            .custom(firstName => {
                regExp = new RegExp(/^[a-zA-Z]+$/);
                if(regExp.test(firstName)){
                    return true;
                }else{
                    throw new Error("Must provide a valid first Name!");;
                }
            })
        ], helper.checkValidatorErrors,
    (req,res) =>  {
        let fullName = req.body.firstName.toLowerCase() + "-" + req.body.lastName.toLowerCase()
        let data = dataUriToBuffer(req.body.img);
        awsServices.uploadToS3(data,fullName)
            .then((location) => {
                let athlete = new Athlete({
                    firstName: req.body.firstName.toLowerCase(),
                    lastName: req.body.lastName.toLowerCase(),
                    fullName: fullName,
                    nationality: req.body.nationality,
                    association: req.body.association,
                    team: req.body.team,
                    gender: req.body.gender,
                    sports: req.body.sports,
                    about: req.body.about,
                    img: location,
                })
                athlete.save((err) => {
                    if(err){
                        console.log(err);
                        res.json({success: false, msg: "Something is missing!"});
                    }else{
                        res.json({success: true, msg: "Action Successful!"});
                    }
                })
            })
            .catch(err => {
                console.log(err);
                res.json({success: false, msg: "Cant upload image!"});
            })
    }
)
})