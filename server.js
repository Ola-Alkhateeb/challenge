const express = require('express');
const aws = require('aws-sdk');


const app = express();
app.use(express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);

var port= 3000 ;
app.listen(process.env.PORT || port);
console.log('Server now listening on port ' + port);

const S3_BUCKET = process.env.S3_BUCKET;

app.get('/', (req, res) => res.render('main.html'));

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
console.log(req) ;

});