'use strict';

var express = require('express');
var app = express();
var basicAuth = require('basic-auth-connect');
var webshot = require('webshot');
var host,port;

app.get('/shot', function(req, res) {

    var width = 1360;
    var height = 768;
    var top = 0;
    var right = 0;
    var left = 0;
    var bottom = 0;
    var link = req.query.link;

    if(req.query.width){
        width =req.query.width;
    }

    if(req.query.height){
        height = req.query.height;
    }


    if(req.query.top){
        top = req.query.top;
    }

    if(req.query.right)
        right = req.query.right;
    if(req.query.left)
        left = req.query.left;
    if(req.query.bottom)
        bottom = req.query.bottom;


    var options = {
        screenSize: {
            width: width
            , height: height
        }
        , shotSize: {
            width: width
            , height: height
        }
        ,shotOffset:
            {
                top:top ,
                right:right,
                left:left,
                bottom:bottom
            }
        , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
        + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
    };
    //console.log(link);
     var name = link+".jpg";
    //name = name.replace(/\//g, "$$");
    name = name.replace("http://www.", "");


    var resName=name;
         console.log(name);
    var nameShot ="screenshot/"+name;
    console.log(nameShot);
    webshot(link,nameShot, options, function(err) {
        if (err) {
            res.send(err);
        }
/*        else{
            console.log('OK');
            var result ='http://' + host + ':' + port+'/'+resName;
            res.send(result);
        }*/
    });

    var result ='http://' + host + ':' + port+'/'+resName;
    res.send(result);


});

app.use(express.static('screenshot'));

var server = app.listen(3200, "node-web-server", function () {
    host = server.address().address;
    port = server.address().port;
    console.log('running at http://' + host + ':' + port);
});
