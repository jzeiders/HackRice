var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ["a", "b", "c", "d", "e", "f"],
		datasets: [{
			label: 'Your Freiendliness',
			data: [12, 19, 3, 5, 2, 3]
		}, {
			label: "Their Positivity",
			data: [28, 48, 40, 19, 86, 27]
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
});
var server = "http://lvh.me:3000";
$("#test").click(function() {
	$.ajax({
		url: server + "/messageData",
		type: "POST",
		data: JSON.stringify("bleh"),
		dataType: "json",
		success: function(data) {
			myChart.data.datasets[0].data[2] = data;
			myChart.update();
		},
		error: function(xhr, status) {
			console.log(status)
		}
	});
});
