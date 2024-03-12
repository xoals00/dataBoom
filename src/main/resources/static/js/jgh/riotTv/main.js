/**
 * 
 */
$('#loading').hide()
//db넣은걸 가지고 와서 사용할떄 쓰는 리스트

let dbFindList = []
let values = []
let images = []
let labels = []

//db에 넣을때 사용하는 리스트
let dbList = [];
let matchCnt = 0;
let matchCnt1 = 1;
const matchIdCnt = 3;
$("#find").on("click", function() {
	$('#detail2').html('')
	matchCnt1 = 1;
	matchCnt = 0;
	$('#myImg').hide();
	$('.riotgraph').hide();
	$('#riotSearch').show();
	findPuuIdFindListSaveDb()

})

function findOne(matchId) {

	chartteam(matchId)

	$('.riotgraph').show();
	$('#riotSearch').hide();
}

function dateFormat(timestamp) {
	var timestamp1 = new Date().getTime();

	date = new Date(timestamp * 1); //과거시간
	date1 = new Date(timestamp1);//현재시간
	/* 생성한 Date 객체에서 년, 월, 일, 시, 분을 각각 문자열 곧바로 추출 */


	var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
	var month1 = ("0" + (date1.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
	var month2 = month1 - month
	if (month2 != 0) {
		return month2 + "달전"

	}
	var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
	var day1 = ("0" + date1.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
	var day2 = day1 - day
	if (day2 != 0) {
		return day2 + "일전"

	}

	var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
	var hour1 = ("0" + date1.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
	var hour2 = hour1 - hour

	if (hour2 != 0) {
		return hour2 + "시간전"

	}
	var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
	var minute1 = ("0" + date1.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
	var minute2 = minute1 - minute
	if (minute2 != 0) {
		return minute2 + "분전"

	}



}


//db에 저장하기
function dbSaveInfoRiotTv() {


	$.ajax({
		contentType: 'application/json',
		type: 'post',
		url: '/riotTv/dbSaveInfoRiotTv',
		async: false,
		data: JSON.stringify(dbList),
		success: function(res) {

			console.log("New데이터 db저장성공")
		}

	})

}
//dbList에 값이 있으면 새로운데이터 존재 >> db저장 >> db불러오기 순서
//dbList에 값이 없으면 현재 db가 최신db >> db불러오기
function findPuuIdFindListSaveDb() {
	$('#moreDetail').remove()
	let gameName1 = $('#gameName1').val()
	let tagLine = $('#tagLine').val()


	data = {
		'gameName': gameName1,
		'tagLine': tagLine,
		'matchIdCnt': matchIdCnt,
		'startValue': (matchIdCnt * matchCnt1)
	}

	$.ajax({

		type: 'post',
		url: '/riotTv/findPuuIdFindList',
		async: false,
		data: data,
		success: function(res) {
			//res : 비교완료된 info정보
			console.log(res)
			dbList = []
			if (res.length != 0) {
				for (let a in res) {

					console.log(res)

					for (let j in res[a].info.participants) {

						let matchId = res[a].metadata.matchId //경기번호
						let championName = res[a].info.participants[j].championName //챔피언 이름
						let teamId = res[a].info.participants[j].teamId //블루or레드  100:블루 200:레드
						let teamName = ''
						if (teamId == 100) {
							teamName = '블루'
						} else {
							teamName = '레드'
						}

						let kills = res[a].info.participants[j].kills //킬
						let assists = res[a].info.participants[j].assists //어시스트
						let deaths = res[a].info.participants[j].deaths//데쓰
						let kda = 0
						if (deaths == 0) {

							let deaths1 = 1;
							kda = ((kills + assists) / deaths1).toFixed(2) //kda
						} else {

							kda = ((kills + assists) / deaths).toFixed(2) //kda

						}

						let totalTimeSpentDead = res[a].info.participants[j].totalTimeSpentDead //총 죽어있던시간
						let visionWardsBoughtInGame = res[a].info.participants[j].visionWardsBoughtInGame // 와드산겟수
						let visionScore = res[a].info.participants[j].visionScore //시야점수
						let win = res[a].info.participants[j].win //승패
						let winCheck = ''
						if (win == false) {

							winCheck = "패배"
						} else {
							winCheck = "승리"
						}
						let gameStartTimestamp = res[a].info.gameStartTimestamp //게임시작시간

						let riotIdGameName = res[a].info.participants[j].riotIdGameName //게임아이디
						let riotIdTagline = res[a].info.participants[j].riotIdTagline //태그

						let goldEarned = res[a].info.participants[j].goldEarned //총 골드량
						let totalDamageDealtToChampions = res[a].info.participants[j].totalDamageDealtToChampions //챔피언에게 가한 피해량
						let totalMinionsKilled = res[a].info.participants[j].totalMinionsKilled //전체 미니언킬
						let wardsPlaced = res[a].info.participants[j].wardsPlaced //와드 설치수
						let puuid = res[a].info.participants[j].puuid //puuid
						let championId = res[a].info.participants[j].championId
						let participantId = res[a].info.participants[j].participantId
						let queueId = res[a].info.queueId


						db = {}
						db.matchId = matchId
						db.championName = championName
						db.teamId = teamId
						db.teamName = teamName

						db.kills = kills
						db.assists = assists
						db.deaths = deaths
						db.kda = kda

						db.totalTimeSpentDead = totalTimeSpentDead
						db.visionWardsBoughtInGame = visionWardsBoughtInGame
						db.visionScore = visionScore
						db.win = win
						db.gameStartTimestamp = gameStartTimestamp

						db.riotIdGameName = riotIdGameName
						db.riotIdTagline = riotIdTagline

						db.goldEarned = goldEarned
						db.totalDamageDealtToChampions = totalDamageDealtToChampions
						db.totalMinionsKilled = totalMinionsKilled
						db.wardsPlaced = wardsPlaced
						db.puuid = puuid
						db.championId = championId
						db.participantId = participantId
						db.winCheck = winCheck
						db.queueId = queueId

						dbList.push(db)
					}



					if (dbList != '') {
						console.log(dbList)
						dbSaveInfoRiotTv()


					}

				}
				console.log("db최신화 완료(API통신완료)")
				newDataInfo()

			} else {
				console.log("db최신화상태 (db통신완료)")
				newDataInfo()
			}
			matchCnt1++;

		}

	})
}

//db에 저장된 최신 데이터 가지고오기
function newDataInfo() {

	let gameName1 = $('#gameName1').val()
	let tagLine = $('#tagLine').val()

	data = {
		'gameName': gameName1,
		'tagLine': tagLine,
		'matchIdCnt': matchIdCnt,
		'startValue': (matchIdCnt * matchCnt)
	}

	$.ajax({
		type: 'post',
		url: '/riotTv/newDataInfo',
		async: false,
		data: data,
		success: function(res) {
			let str = ''


			for (let z in res) {

				if (res[z].riotIdGameName == gameName1) {

					let time = res[z].gameStartTimestamp
					let queue = ''

					if (res[z]['queueId'] == 450) {
						queue = "<span style=color:blue;> 칼바람</span>"
					} else if (res[z]['queueId'] == 490) {
						queue = "<span style=color:gray;> 빠른대전</span>"
					} else if (res[z]['queueId'] == 420) {
						queue = "<span style=color:red;> 솔로랭크</span>"
					} else if (res[z]['queueId'] == 440) {
						queue = "<span style=color:skyblue;> 자유랭크</span>"
					} else if (res[z]['queueId'] == 1900) {
						queue = "<span style=color:green;> 우르프</span>"
					}


					str += "<center>"
					str += dateFormat(time)
					str += "|" + res[z].winCheck   + "|" + res[z].teamName + "|" +queue+ "| "
					str += "<img width='30' height='30'  alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + res[z].championName + ".png'>"

					str += "  "+ '<input type = "button" onclick = "findOne(\'' + res[z].matchId + '\')" value = "라문철분석">'
					str += "</center>"
					cnt++;

				}

			}

			str += "<div id = moreDetail><center><button align = center><a href = 'javascript:findPuuIdFindListSaveDb()'> ▽▽더보기click!▽▽</a></button></center></div>"
			$('#detail2').append(str)
		}
	})
	matchCnt++

}





///////그래프///////////////////////

function loadingLogoInput() {
	let str = ''
	str += '<img src="/img/loadingimg.gif"/>'

	$('#loading').html(str)

}
function loadingLogoOutput() {

	$('#loading').empty()

}
////그래프/////




function chartGraph(champion_name_kr) {
	loadingLogoInput()
	data3 = { "champion_name_kr": champion_name_kr }

	$.ajax({
		type: 'post',
		url: '/riotTv/forGraphInfo',
		//		async: false,
		data: data3,
		success: function(res) {

			$('#myImg').show();
			$('#teamrate').show();
			$('#myChart1').empty();
			$('#myChart2').empty();
			$('#myChart3').empty();


			$('#myChart1').append('챔피언에게 가한 피해량');
			$('#myChart1').append('<canvas id="circle"><canvas>');
			$('#myChart2').append('챔피언 처치 킬 수');
			$('#myChart2').append('<canvas id="doughnutChart" width = "250"><canvas>');
			$('#myChart3').append('와드 구매수');
			$('#myChart3').append('<canvas id="bar-chart-horizontal" width = "250"><canvas>');



			//	console.log(dbFindList)
			let teamIdmatch = ''
			let gameName1 = $('#gameName1').val()
			for (let i in res) {

				if (res[i].matchId == matchId && res[i].riotIdGameName == gameName1) {
					console.log(res[i])
					teamIdmatch = res[i].teamId
					let myImg = "내챔프 :" + "<img width='100' height='100'  alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + res[i].championName + ".png'>"
					let str1 = `
					 | KDA : ${res[i].kda} | ${res[i].winCheck} |  ${res[i].teamName} |
					`
					$('#myImg').html(myImg + str1);
				}

			}
			let championImgList = []
			for (let i in res) {

				if (res[i].matchId == matchId && res[i].teamId == teamIdmatch) {

					let img = "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + res[i].championName + ".png"
					//				championNameList.push(dbFindList[i].koChampionName)
					championImgList.push(img)
				}

			}
			let championNameList = []
			for (let i in res) {

				if (res[i].matchId == matchId && res[i].teamId == teamIdmatch) {

					championNameList.push(res[i].koChampionName)

				}

			}

			let totalDamageDealtToChampionsList = []
			let totalDamageDealtToChampionsSum = 0;
			let MytotalDamageDealtToChampions = 0;
			for (let i in res) {

				if (res[i].matchId == matchId && res[i].teamId == teamIdmatch) {


					totalDamageDealtToChampionsList.push(res[i].totalDamageDealtToChampions)
					totalDamageDealtToChampionsSum += parseInt(res[i].totalDamageDealtToChampions)
					if (res[i].riotIdGameName == gameName1) {
						MytotalDamageDealtToChampions = res[i].totalDamageDealtToChampions

					}
				}

			}
			let dmgPercent = (MytotalDamageDealtToChampions / totalDamageDealtToChampionsSum) * 100

			//	console.log(totalDamageDealtToChampionsSum)
			//총딜량
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
					//			labels: championNameList,
					datasets: [{
						data: totalDamageDealtToChampionsList,

						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						], borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(255, 159, 64, 1)'
						]
					}]
				},
				options: {
					responsive: false,
					maintainAspectRatio: false, //x축 반으로 줄임
					cutoutPercentage: 80,
					elements: {
						center: {
							text: dmgPercent.toFixed(2) + "%",
							color: '#FF6384', // Default is #000000
							fontStyle: 'Arial', // Default is Arial
							sidePadding: 20, // Default is 20 (as a percentage)
							minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
							lineHeight: 10 // Default is 25 (in px), used for when text wraps


						}
					}
				}
			};

			var ctx = document.getElementById("circle").getContext("2d");
			var myChart = new Chart(ctx, config);
			///////////////////////////////////////////////////////////
			let killsList = []
			for (let i in res) {

				if (res[i].matchId == matchId && res[i].teamId == teamIdmatch) {


					killsList.push(res[i].kills)

				}

			}
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
					//			labels: championNameList,
					datasets: [{
						data: totalDamageDealtToChampionsList,

						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						], borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(255, 159, 64, 1)'
						]
					}]
				},
				options: {
					responsive: false,
					maintainAspectRatio: false, //x축 반으로 줄임
					cutoutPercentage: 80,
					elements: {
						center: {
							text: dmgPercent.toFixed(2) + "%",
							color: '#FF6384', // Default is #000000
							fontStyle: 'Arial', // Default is Arial
							sidePadding: 20, // Default is 20 (as a percentage)
							minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
							lineHeight: 10 // Default is 25 (in px), used for when text wraps


						}
					}
				}
			};

			var ctx = document.getElementById("circle").getContext("2d");
			var myChart = new Chart(ctx, config);
			///수평바
			labels = championNameList;
			images = championImgList

				.map(png => {
					const image = new Image();
					image.src = png;
					return image;
				});
			values = killsList;

			new Chart(document.getElementById("doughnutChart"), {
				type: "horizontalBar",
				plugins: [{
					afterDraw: chart => {
						var ctx = chart.chart.ctx;
						var xAxis = chart.scales['x-axis-0'];
						var yAxis = chart.scales['y-axis-0'];
						yAxis.ticks.forEach((value, index) => {
							var y = yAxis.getPixelForTick(index);
							ctx.drawImage(images[index], xAxis.left - 27, y - 7, 15, 15);
						});
					}
				}],
				data: {
					labels: labels,
					datasets: [{
						label: '와드 구입 갯수',
						data: values,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						], borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 2
					}]
				},
				options: {
					responsive: false,
					maintainAspectRatio: false, //x축 반으로 줄임
					layout: {
						padding: {
							left: 50
						}
					},
					tooltips: { //튤팁제거
						enabled: false
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
								autoSkip: true,  // 👈
								maxTicksLimit: 1 // 👈
							}
						}],

					}
				}
			});









			let visionWardsBoughtInGameList = []
			for (let i in res) {

				if (res[i].matchId == matchId && res[i].teamId == teamIdmatch) {


					visionWardsBoughtInGameList.push(res[i].visionWardsBoughtInGame)

				}

			}
			///수평바
			labels = championNameList;
			images = championImgList

				.map(png => {
					const image = new Image();
					image.src = png;
					return image;
				});
			values = visionWardsBoughtInGameList;

			new Chart(document.getElementById("bar-chart-horizontal"), {
				type: "horizontalBar",
				plugins: [{
					afterDraw: chart => {
						var ctx = chart.chart.ctx;
						var xAxis = chart.scales['x-axis-0'];
						var yAxis = chart.scales['y-axis-0'];
						yAxis.ticks.forEach((value, index) => {
							var y = yAxis.getPixelForTick(index);
							ctx.drawImage(images[index], xAxis.left - 27, y - 7, 15, 15);
						});
					}
				}],
				data: {
					labels: labels,
					datasets: [{
						label: '와드 구입 갯수',
						data: values,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						], borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 2
					}]
				},
				options: {
					responsive: false,
					maintainAspectRatio: false, //x축 반으로 줄임
					layout: {
						padding: {
							left: 50
						}
					},
					tooltips: { //튤팁제거
						enabled: false
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
						}],

					}
				}
			});
		}

	})

}

$('#backRiot').on("click", function() {

	$('#myImg').hide();
	$('.riotgraph').hide();
	$('#riotSearch').show();
})
