var express = require('express'),
 http = require('http'),
 path = require('path');

 //Congifure eXxpress
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('Cookies'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/')));
    app.use(function(req, res) {
          // Use res.sendfile, as it streams instead of reading the file into memory.
                  res.sendfile(__dirname + '/index.html');
        });
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//start the Server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
/*var http = require("http");
var url = require("url");

var pg = require('pg'); 

var conString = "postgres://postgres:postpass@localhost:5432/postgres";

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];

    //route(pathname);
	//here starts the postgres connection part
	var client = new pg.Client(conString);
		client.connect(function(err) 
		{
		  if(err) {
		    return console.error('could not connect to postgres', err);
		  }
		  
		  //old query  : select count(survey_id),location from responses group by location,survey_id
		 // client.query('select count(survey_id),status from responses group by survey_id,status', function(err, result) 
		  client.query('select * from "myTab" order by "year","Country"', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    console.log("Total number of rows read : "+result.rows.length);
		    //console.log("The individual records are : ____________________________________________");
		    
		   
		    for(i=1;i<=result.rows.length;i++)
			{ 
			//console.log(" "+JSON.stringify(result.rows[i]));
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			//console.log("the result is :"+result.rows[i]);
			//var countObj=JSON.parse(jsobObject);
			}
		  	client.end();
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	console.log("here it is :"+ typeof jsobObjectFullSet);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		});
  }
  http.createServer(onRequest).listen(8400);
  console.log("Server has started.");
}
exports.start = start;*/