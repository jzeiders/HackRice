// Wrapper for the sentiment calls
var moment = require('moment');
var Promise = require("promise");
var request = require("request");
var analyze = function(string) {
	var options = {
		method: 'POST',
		url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
		headers: {
			authorization: 'Basic bmljaG9sYXMucmFuY2VAZ21haWwuY29tOkRlZmF1bHQgZThXZVpOSjBMU3JycGNidUUzVE5BUHZIYkY5dFphZ0grYjBXVTNBclZXTQ==',
			accept: 'application/json',
			'content-type': 'application/json',
			'ocp-apim-subscription-key': '137419187f80457e97850858670e5531'
		},
		body: {
			documents: [{
				language: 'en',
				id: '1',
				text: string
			}]
		},
		json: true
	};
	return new Promise(function(resolve, reject) {
		request(options, function(error, response, body) {
			if (error) {
				console.log("Error:", error);
				reject(error);
			}
			resolve(body);
		});
	});
};
var analyzeMessages = function(messages) {
	return new Promise(function(resolve, reject) {
		messagePromises = messages.map(function(message) {
			return analyze(message.text);
		});
		Promise.all(messagePromises).then(function(data) {
      // console.log(data)
      var avg = data.map(function(v) {
        if(v.hasOwnProperty("documents"))
          return v.documents[0].score; // Formats Data
			})
      var sum = 0;
      for(var i = 0; i < avg.length; i++){
        sum+=avg[i]
      }
      // console.log(sum)
      sum /= avg.length; // Averages Data
			sum = Math.floor(sum * 100) // Scales to 100pt Scale
			resolve(sum)
		}).catch(function(err) {
			reject(err);
		});
	});
};
var findCloseness = function(messages) {
	return messages.length
};

var generatePositivities = function(friends) {
	var positivityPromises = friends.map(function(friend) {
    // console.log(friend.messages);
    return analyzeMessages(friend.messages)
			// analyzeMessages(friend.messages),
			// friend.name,
			// findCloseness(friend.messages)
		// ]
	});
	return Promise.all(positivityPromises).then(function(data) {
    var r_value = []
    for(var i = 0; i < data.length; i++){
      r_value.push({
        name: friends[i].name,
        positivity: data[i],
        closeness: findCloseness(friends[i].messages)

      })
    }
      // console.log("r_value" + r_value)
      return r_value
	}).catch(function(err) {
		return err;
	});
};
module.exports = {
	analyze: function(data) { // Returns
		return generatePositivities(data);
	}
};
