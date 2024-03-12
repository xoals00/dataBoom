champChartGraph('GAREN')

//챔피언 클릭시 차트만들기
const champImgItem = document.querySelector('.champImgItems');
//const chartContainer = document.querySelector('.championGraphContainer');
champImgItem.addEventListener('click', (e) => {

	console.log(e.target.id)
	champChartGraph(e.target.id)
	//		chartContainer.scrollIntoView({ top: 0, behavior: 'smooth' });
//	window.scrollTo({
//		top: 0,
//		behavior: 'smooth',
//	})

	//차트만들기 시작

})

horizontalBarlist = []
function champChartGraph(championName) {
	if (championName === '') {
		alert('챔피언 이미지를 눌러주세요.');
		return false;
	} else {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	data = { 'championName': championName };
	$.ajax({
		type: 'post',
		url: '/forGraphInfo',
		data: data,
		success: function(res) {

			//			let championDiv = document.querySelector('.championGraphContainer');
			//			championDiv.style.backgroundImage = `url(img/jhl/summoner.png)`;
			//			championDiv.style.backgroundSize ='cover'
			//			championDiv.style.opacity = 0.8;
			//			championDiv.style.backgroundColor = 'rgba(255, 255, 255, 1)'

			//			console.log(championDiv);

			let btn = "<select id='ChampGraphPosition' name='ChampGraphPosition'>";
			res.forEach((item, index) => {
				btn += `<option value='${index}'>${item.teamPosition}&${item.tier}</option>`;
			});
			btn += '</select>';
			$('.box-leftSelect').html(btn);

			$('#ChampGraphPosition').change(function() {
				createDonutChart(res[this.value]);
			});

			// 초기화면에서는 첫 번째 옵션에 대한 도넛 그래프 생성

			$('#myImg').show();
			$('#teamrate').show();
			$('#myChart1').empty().append('<canvas id="winDoughnutChart"><canvas>');
			let myImg = `<div class='myChampbox'>
                            <div class='mychamp_imgs'>
                                <img alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${res[0].champion_name}.png' class= 'champImgs'>
                            </div>
                        </div>
                        <div class='myChampsNameBox'>
                            <span class='myChampsName'>${res[0].champion_name_kr}</span>
                        </div>`;
			$('.myImg').html(myImg);
			$('#teamrate').show();
			//			$('#myChart2').empty();
			//			$('#myChart3')

			//			$('#myChart2').append('<canvas id="doughnutChart" width = "250"><canvas>');
			$('#myChart3').empty().append('<canvas id="bar-chart-horizontal" width = "500px"><canvas>');

			let btn1 = ''
			btn1 += "<select id='ChampGraphPick' name='ChampGraphPick'>"
			for (let i in res) {

				btn1 += "<option value='" + res[i].teamPosition + "'>" + res[i].teamPosition + '&' + res[i].tier + "</option>"

			}
			btn1 += "</select>"
			$('.box-right2').html(btn1)

			var selectedPosition = document.getElementById("ChampGraphPick").value;
			//			console.log(selectedPosition)
			for (let i in res) {
				horizontalBarlist.push(makeHorizontalBar(res[i].champion_name, selectedPosition, res[i].tier));
				createDonutChart(res[0]);

			}
			$('#ChampGraphPick').change(function() {
				//				var selectedPosition = document.getElementById("ChampGraphPick").value;
				console.log(selectedPosition)

				for (let i in res) {
					horizontalBarlist.push(makeHorizontalBar(res[i].champion_name, selectedPosition, res[i].tier));
				}
			})
		}
	});
}

function createDonutChart(dataForChart) {
	Chart.pluginService.register({
		beforeDraw: function(chart) {

			if (chart.config.options.elements.center) {
				// Get ctx from string
				var ctx = chart.chart.ctx;

				// Get options from the center object in options
				var centerConfig = chart.config.options.elements.center;
				var fontStyle = centerConfig.fontStyle || 'Arial';
				var txt = centerConfig.text;
				var color = centerConfig.color || '#000';
				var maxFontSize = centerConfig.maxFontSize || 75;
				var sidePadding = centerConfig.sidePadding || 20;
				var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
				// Start with a base font of 30px
				ctx.font = "30px " + fontStyle;

				// Get the width of the string and also the width of the element minus 10 to give it 5px side padding
				var stringWidth = ctx.measureText(txt).width;
				var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

				// Find out how much the font can grow in width.
				var widthRatio = elementWidth / stringWidth;
				var newFontSize = Math.floor(30 * widthRatio);
				var elementHeight = (chart.innerRadius * 2);

				// Pick a new font size so it will not be larger than the height of label.
				var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
				var minFontSize = centerConfig.minFontSize;
				var lineHeight = centerConfig.lineHeight || 25;
				var wrapText = false;

				if (minFontSize === undefined) {
					minFontSize = 20;
				}

				if (minFontSize && fontSizeToUse < minFontSize) {
					fontSizeToUse = minFontSize;
					wrapText = true;
				}

				// Set font settings to draw it correctly.
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
				var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
				ctx.font = fontSizeToUse + "px " + fontStyle;
				ctx.fillStyle = color;

				if (!wrapText) {
					ctx.fillText(txt, centerX, centerY);
					return;
				}

				var words = txt.split(' ');
				var line = '';
				var lines = [];

				// Break words up into multiple lines if necessary
				for (var n = 0; n < words.length; n++) {
					var testLine = line + words[n] + ' ';
					var metrics = ctx.measureText(testLine);
					var testWidth = metrics.width;
					if (testWidth > elementWidth && n > 0) {
						lines.push(line);
						line = words[n] + ' ';
					} else {
						line = testLine;
					}
				}

				// Move the center up depending on line height and number of lines
				centerY -= (lines.length / 2) * lineHeight;

				for (var n = 0; n < lines.length; n++) {
					ctx.fillText(lines[n], centerX, centerY);
					centerY += lineHeight;
				}
				//Draw text in center
				ctx.fillText(line, centerX, centerY);
			}
		}
	});

	var config = {
		type: 'doughnut',
		data: {
			labels: ['승리', '패배'],
			datasets: [{
				data: [dataForChart.win_rate, 100 - dataForChart.win_rate],
				backgroundColor: ['rgba(192, 230, 255, 1)', 'rgba(255, 210, 220, 1)'], //불투명도 사용안해야지 다크모드시 편한듯.
				borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
			}]
		},
		options: {
			responsive: false,
			maintainAspectRatio: false,
			cutoutPercentage: 74,
			hover: {
				mode: 'nearest', // 커서를 가져다 대면 가장 가까운 요소에 대한 효과 적용
				intersect: false, // 불필요한 효과 방지
			},
			elements: {
				center: {
					text: `${dataForChart.win_rate.toFixed(2)}%`,
					color: 'rgba(54, 162, 235, 1)',
					fontStyle: 'Arial',
					sidePadding: 35,
					minFontSize: 17,
					lineHeight: 10
				}
			}
		}
	};
	$('#myChart1').empty().append('<canvas id="winDoughnutChart"><canvas>');
	var ctx = document.getElementById('winDoughnutChart').getContext('2d');
	ctx.canvas.width = 280;

	var myChart = new Chart(ctx, config);
}

let myChart;//초기 설정
function makeHorizontalBar(champion_name, teamPosition, tier) {

	data = { 'champion_name': champion_name, 'teamPosition': teamPosition, 'tier': tier }

	$.ajax({
		contentType: 'application/json',
		type: 'post',
		url: '/forGraphInfo2',
		data: JSON.stringify(data),
		success: function(res) {
			if (!makeHorizontalBar.consoleLogDone) {
				console.log(res);
				makeHorizontalBar.consoleLogDone = true;
			}

			// 기존 차트 삭제
			if (myChart) {
				myChart.destroy();
			}
			///수평바
			let championNameList = []
			let championImgList = []
			let championPickList = []

			for (let i in res) {

				let myImg = "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + res[i].champion_name + ".png"

				championNameList.push(res[i].champion_name_kr) //툴팁에 챔피언의 이름이 한국어로 뜸
				championImgList.push(myImg)
				championPickList.push(res[i].pick_rate) //

			}

			labels = championNameList;
			images = championImgList //티어&포지션별 픽률 탑텐


				.map(png => {
					const image = new Image();
					image.src = png;
					return image;
				});
			values = championPickList;

			myChart = new Chart(document.getElementById("bar-chart-horizontal"), {
				type: "horizontalBar",
				plugins: [{
					afterDraw: chart => {
						var ctx = chart.chart.ctx;
						var xAxis = chart.scales['x-axis-0'];
						var yAxis = chart.scales['y-axis-0'];
						yAxis.ticks.forEach((value, index) => {
							var y = yAxis.getPixelForTick(index);
							ctx.drawImage(images[index], xAxis.left - 20, y - 9, 15, 15);
						});
					}
				}],
				data: {
					labels: labels,
					datasets: [{
						label: '픽률',
						data: values,
						backgroundColor: [ // 막대 배경색 지정
							'rgba(255, 183, 183, 1)',
							'rgba(165, 214, 255, 1)',
							'rgba(255, 231, 162, 1)',
							'rgba(146, 220, 220, 1)',
							'rgba(255, 184, 148, 1)',
							'rgba(228, 228, 228, 1)',
							'rgba(228, 228, 228, 1)',
							'rgba(228, 228, 228, 1)',
							'rgba(228, 228, 228, 1)',
							'rgba(228, 228, 228, 1)'

						], borderColor: [ // 막대 테두리 색상 지정
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 188, 0, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(255, 119, 51, 1)',
							'rgba(178, 178, 178, 1)',
							'rgba(178, 178, 178, 1)',
							'rgba(178, 178, 178, 1)',
							'rgba(178, 178, 178, 1)',
							'rgba(178, 178, 178, 1)'
						], borderWidth: 2 //막대 테두리 넓이 

					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false, //x축 반으로 줄임
					layout: {
						padding: {
							left: 50
						}
					},
					tooltips: { //튤팁제거
						enabled: true
					},
					legend: {
						display: false
					},
					title: {
						display: false
					},
					scales: {
						yAxes: [{
							ticks: {
								display: false
							},
							gridLines: {
								drawBorder: false,
							}
						}],
						xAxes: [{
							ticks: {
								beginAtZero: true
							},
							gridLines: {
								display: false,
							},
							ticks: {
								autoSkip: true,  //
								maxTicksLimit: 1 // 
							}
						}]

					},
					hover: {
						mode: 'dataset', // 'index', 'dataset', 또는 'point' 등으로 설정
						intersect: true, // 필요에 따라 설정
					},
				}


			})
		}
	})
}

