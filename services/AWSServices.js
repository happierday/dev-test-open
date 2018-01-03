const aws = require('aws-sdk');

aws.config.loadFromPath('config/credentials.json');

const s3 = new aws.S3({
    apiVersion: '2006-03-01'
});

function uploadToS3(data,fullname){
    let params = {
        Bucket: 'dev-test-open', 
        Key: fullname+'/img', 
        Body: data
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if(err) reject(err);
            resolve(data.Location);
        })
    });
}

module.exports = {
    uploadToS3: uploadToS3
}