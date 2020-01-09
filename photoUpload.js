const express = require('express'),
      app=express();
      Blob = require('blob');
      router  = express.Router(),
      request =  require('request'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      AWS = require('aws-sdk'),
      S3 = new AWS.S3({
        accessKeyId: 'YOUR AWS ACCESSKEYID',
        secretAccessKey: 'YOUR AWS SECRETACCESSKEY'
        });
      
      app.set('view engine', 'ejs');

      app.get('/',(req, res)=>{
        const params = {
            Bucket: 'BUCKET NAME',
            Key: 'hot.jpg'
        }
        S3.getObject(params, (err, data)=>{
            if(err) throw err;
            else{ const buf = data.Body;
                const src = 'data:image/jpeg;base64,' + buf.toString('base64');
                res.render('showImage',{src: src});
            }
        });
      });
      app.listen(3000, (req, res)=>{
          console.log('Server started!!');
      })
