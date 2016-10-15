var server = "localhost:3000"
$("#test").click(function() {
	$.post(server + "/messageData", function(data) {
		console.log(data);
	});
});
