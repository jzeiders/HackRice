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
			return analyze(message);
		});
		Promise.all(messagePromises).then(function(data) {
			resolve(data.map(function(v){
        return v.documents[0].score;
      }));
		}).catch(function(err) {
			reject(err);
		});
	});
};
module.exports = {
	analyze: function(strings) { // Returns
		return analyzeMessages(strings);
	}
};
