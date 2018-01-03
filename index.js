const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || "development";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://jian-test:wu134679@ds135777.mlab.com:35777/dev-test-open',(err)=>{
    if(err){
        console.log('cant connect' + err);
    }else{
        console.log('connected to dev-test-open');
    }
})
const app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded(
    {extended:true}
));

if(env === "development"){
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
}else if(env === "production"){
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname + '/client/dist/index.html'));
    })
}

const controllers = require('./controllers');

controllers(app);

app.listen(port,() => {
    console.log('listening to ' + port);
});

