// Wrapper for the FB Calls
var cheerio = require('cheerio');
var fs = require('fs');

$ = cheerio.load(fs.readFileSync('messages.htm'));
module.exports = {
	parse: function() {
		users = {};
		data = $(".message").each(function(i, elem) {
			var name = $(this).find('.user').text()
			var time = $(this).find('.meta').text()
			var text = $(this).next().text()
			if (users.hasOwnProperty(name)) {
				users[name].messages.push({
					text: text,
					time: time
				});
			} else {
				users[name] = {
					messages: []
				};
			}
		});
		userFormat = [];
		Object.keys(users).forEach(function(key) {
			if (users[key].messages.length > 2) {
				userFormat.push({
					name: key,
					messages: users[key].messages
				});
			}
		})
		return userFormat;
	}
}
