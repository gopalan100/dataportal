var express = require('express'),
 http = require('http'),
 path = require('path');
var pg = require('pg'); 
var url = require("url");
 lib = require('./db.js');
  
 //Congifure eXxpress
var app = express();

//var conString = "postgres://fuotbizevfhggj:q8DhvxsH1x_lim4xjNouIHrKDw@ec2-107-22-186-169.compute-1.amazonaws.com:5432/d8phhsdnscr56l";
var conString = "postgres://postgres:postpass@localhost:5432/postgres";

var connection = new pg.Client(conString);
connection.connect(function () {
    lib.setupDBAndTable(connection);
}); 

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

app.get('/getChartData', function(request, response){
  
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
	var client = new pg.Client(conString);
		client.connect(function(err) 
		{
		  if(err) {
		    return console.error('could not connect to postgres', err);
		  }
		  client.query('select * from "myTab" order by "year","Country"', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    console.log("Total number of rows read : "+result.rows.length);
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	client.end();
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		});
		
		console.log("here i am ... this is me...");
});

app.get('/getSurveyData', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
	var client = new pg.Client(conString);
		client.connect(function(err) 
		{
		  if(err) {
		    return console.error('could not connect to postgres', err);
		  }
		  client.query('select * from "chart_data"', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    console.log("Total number of rows read : "+result.rows.length);
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	client.end();
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		});
		
		console.log("here i am ... this is me...");
});

app.get('/getSectors', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
	var client = new pg.Client(conString);
		client.connect(function(err) 
		{
		  if(err) {
		    return console.error('could not connect to postgres', err);
		  }
		  client.query('SELECT * FROM "sector" where id in (select distinct "sectorID" from chart_data)', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    console.log("Total number of rows read : "+result.rows.length);
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	client.end();
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		});
		console.log("here i am ... this is me...");
});

app.get('/getCountries', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
	var client = new pg.Client(conString);
		client.connect(function(err) 
		{
		  if(err) {
		    return console.error('could not connect to postgres', err);
		  }
		  client.query('select * from Countries where id in (select distinct "countryID" from chart_data)', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    console.log("Total number of rows read : "+result.rows.length);
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	client.end();
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		});
		
		console.log("here i am ... this is me...");
});

app.get('/getYears', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
	var client = new pg.Client(conString);
		client.connect(function(err) 
		{
		  if(err) {
		    return console.error('could not connect to postgres', err);
		  }
		  client.query('SELECT "Year" FROM "Timestamp" where id in (select distinct "timestampID" from chart_data)', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    console.log("Total number of rows read : "+result.rows.length);
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	client.end();
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		});
		console.log("here i am ... this is me...");
});

//start the Server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});