var express = require("express");

var app = express();

app.post("/getData", function(req,res){
  
  res.send("Test");
});

app.listen(3000, function() {
	console.log("started server");
});
