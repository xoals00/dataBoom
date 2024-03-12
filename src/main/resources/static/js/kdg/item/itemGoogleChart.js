$(document).ready(function() {

	str = "<img src='../img/kdg/loading.gif' class = 'loadingImg2'>"
	$('.graph_box').html(str)

	$('.loadingImg').show()

	google.charts.load('current', { 'packages': ['corechart'] });
	google.charts.setOnLoadCallback(drawChart);

	let itemNameList = []
	function drawChart() {

		var line = $('#graph_line').text()
		//		console.log(line)
		data = {

			"line_graph": line

		}
		$.ajax({

			type: "POST",
			url: "/kdg/itemGraphLine",
			data: data,
			success: function(res) {
//				console.log(res)
				str2 = `
					<div id = "chart"></div>
				`
				$('.graph_box').html(str2)

				//				console.log(itemNameList)
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'itemName');
				data.addColumn('number', '픽률(%)');

//				console.log(data)
				var rows = [];

				for (var i = 0; i < 5; i++) {

					var itemName = res[i].itemName_graph;

					var itemPickRate = parseFloat((parseFloat((res[i].itemPickCnt_graph / res[0].allItemCnt_graph) * 100)).toFixed(2));
					rows.push([itemName, itemPickRate]);
				}

				data.addRows(rows);
				var options = {

					title: (res[0].line_graph).toUpperCase(),
					curveType: 'none',
					legend: { position: 'bottom' },
					colors: ['blue'],
					width: 768.59,
					height: 300,
					animation: {
						startup: true,
						duration: 1000,
						easing: 'inAndOut'
					}, chartArea: {
						left: 80,
						top: 60,
						width: '88%',
						height: '60%'
					}

				}
				var container = document.getElementById('chart')
				var chart = new google.visualization.LineChart(container);

				chart.draw(data, options);

				$('.loadingImg').hide()
			}

		})

	}

})


function choiceLineGraph(a) {

	$('#graph_line').html(a)

	str = "<img src='../img/kdg/loading.gif' class = 'loadingImg'>"
	$('.graph_box').html(str)

	$('.loadingImg').show()

	google.charts.load('current', { 'packages': ['corechart'] });
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {

		var line = $('#graph_line').text()

		data = {

			"line_graph": line

		}
		$.ajax({

			type: "POST",
			url: "/kdg/itemGraphLine",
			data: data,
			success: function(res) {

				str2 = `
					<div id = "chart"></div>
				`
				$('.graph_box').html(str2)

				var data = new google.visualization.DataTable();
				data.addColumn('string', 'itemName');
				data.addColumn('number', '픽률(%)');
				var rows = [];
				for (var i = 0; i < 5; i++) {
					var itemName = res[i].itemName_graph;
					var itemPickRate = parseFloat((parseFloat((res[i].itemPickCnt_graph / res[0].allItemCnt_graph) * 100)).toFixed(2));
					rows.push([itemName, itemPickRate]);
				}
				data.addRows(rows);
				var options = {

					title: (res[0].line_graph).toUpperCase(),
					curveType: 'none',
					legend: { position: 'bottom' },
					colors: ['blue'],
					width: 768.59,
					height: 300,
					animation: {
						startup: true,
						duration: 1000,
						easing: 'inAndOut'
					}, chartArea: {
						left: 80,
						top: 60,
						width: '88%',
						height: '60%'
					}

				}

				var chart = new google.visualization.LineChart(document.getElementById('chart'));
				chart.draw(data, options);

				$('.loadingImg').hide()

				str3 = "<img src='../img/" + a + ".png' style='width: 20px; height: 20px;'> " + a.toUpperCase() + "</a>"
				$('.line-select').html(str3)
			}

		})

	}
}