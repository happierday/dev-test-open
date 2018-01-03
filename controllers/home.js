const Athlete = require('../models/athlete');

module.exports = ((router) => {
    router.get('/',(req,res) => {
        Athlete.find({},(err,data) => {
            if(err){
                console.log(err);
                res.json({success: false, msg: 'Unable to load all athletes!'})
            }
            res.json({data: data});
        })
    })
})