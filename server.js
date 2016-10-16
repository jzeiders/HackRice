var express = require("express");
var request = require("request");
var sentiment = require("./sentiment.js");
var bodyParser = require("body-parser");
var Promise = require("promise");
var cors = require("cors");
var app = express();
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
});
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());


app.post("/getData", function(req, res) {
	sentiment.analyze(req.body.string).then(function(data) {
		res.send(data);
	}).catch(function(err) {
		console.log(err);
		res.status("Err").send(err);
	});
});
app.post("/messageData", function(req, res) {
  res.send("test")
	sentiment.analyze(["test"]).then(function(data) {
		console.log(data);
		res.send(JSON.stringify(data));
	}).catch(function(err) {
		console.log(err);
	});

	/*
	fb.getMessage()



	*/
});

app.listen(3000, function() {
	console.log("started server");
});
