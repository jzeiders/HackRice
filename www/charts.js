var jackData = JSON.parse('[{"name":"Darren Wang","positivity":59,"closeness":5},{"name":"Sushanth Raman","positivity":64,"closeness":7},{"name":"Ciara Judge","positivity":59,"closeness":3},{"name":"Danny Liu","positivity":75,"closeness":3}]');
var jackPositivity = jackData.sort(function(a, b) {
	if (a.positivity * 1 < b.positivity * 1) {
		return 1;
	}
	if (a.positivity * 1 > b.positivity * 1) {
		return -1;
	}
	// a must be equal to b
	return 0;
});
var jackPoslabels = jackPositivity.map(function(v) {
	return v.name;
})
var jackPosData = jackPositivity.map(function(v) {
	return v.positivity;
})
console.log(jackPosData);
var ctx = $("#jackChartPos");
var jackChartPos = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: jackPoslabels,
		datasets: [{
			label: 'Positivity',
      backgroundColor: [
				"#FF6384",
				"#36A2EB",
				"#FFCE56"
			],
			data: jackPosData
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
var jackCloseness = jackData.sort(function(a, b) {
	if (a.closeness < b.closeness) {
		return 1;
	}
	if (a.closeness > b.closeness) {
		return -1;
	}
	// a must be equal to b
	return 0;
});
var ctz = $("#jackPieChart")
var myPieChart = new Chart(ctz, {
	type: 'pie',
	data: {
		labels: jackCloseness.map(function(v){
      return v.name
    }),
		datasets: [{
			data: jackCloseness.map(function(v){
        return v.closeness*20;
      }),
			backgroundColor: [
				"#FF6384",
				"#36A2EB",
				"#FFCE56"
			],
			hoverBackgroundColor: [
				"#FF6384",
				"#36A2EB",
				"#FFCE56"
			]
		}]
	}
});





var jackBestFriend = jackData.sort(function(a, b) {
	if (a.positivity * a.closeness < b.positivity * b.closeness) {
		return 1;
	}
	if (a.positivity * a.closeness > b.positivity * b.closeness) {
		return -1;
	}
	// a must be equal to b
	return 0;
});


var jackBestlabels = jackBestFriend.map(function(v) {
	return v.name;
})
var jackBestData = jackBestFriend.map(function(v) {
	return v.positivity * v.closeness;
})
var cty = $("#jackChartCloseness")
var jackChartBest = new Chart(cty, {
	type: 'bar',
	data: {
		labels: jackBestlabels,
		datasets: [{
			label: 'Friendliness',
			data: jackBestData,
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56"
      ],
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
console.log(jackPositivity, jackBestFriend)
