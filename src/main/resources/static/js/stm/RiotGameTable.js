/**
 * 
 */




$('a.feellink').click(function(e) //a태그 눌러도 맨위로 안올라감
{
	e.preventDefault();
});
let win = 0
let lose = 0
function showGameTamble(res, data) {
	moredata = data
	//	console.log(data)
	//	console.log(res)
	let ccc = ''
	let str = ''
	let queue = ''
	let spentTime = ''
	let ingamespentTime = ''
	let win_lose = ''
	let spellD = ''
	let spellF = ''
	let kills = ''
	let deaths = ''
	let assists = ''
	let kda = ''
	let mykill = ''
	let wardscore = ''
	let totalCs = ''
	let dragon = ''
	let champimg = ''

	$('.graph1').empty()

	for (let i in res) {
		for (let j in res[i]['info']) {
			if (data['gameName'] == res[i]["info"][j]['riotIdGameName'] || data['gameName'] == res[i]["info"][j]['summonerName']) {
				profileIcon = res[i]["info"][j]['profileIcon']
				summonerLevel = res[i]["info"][j]['summonerLevel']
				riotIdGameName = res[i]["info"][j]['riotIdGameName']
				if (res[i]["info"][j]['win'] == '1') {
					win += 1
				} else {
					lose += 1
				}

			}
		}

	}
	if (data['matchCnt'] == 1) { //최신 레벨과 플레이어 아이콘을 위해 저장
		newprofileIcon = profileIcon
		newsummonerLevel = summonerLevel
		newriotIdGameName = riotIdGameName
	}
	ccc += `<div class=container333Box>
	<div class=container333>
	<div class="stmH">
            <div class="stmHright">
                <div class="cpicon">
                    <div class = "cpimg">
	<img width='85' height='85' alt='못 불러옴' style = "border-radius: 30px;"  src=https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${newprofileIcon}.png>
                    </div></div>
                    <div class="uidLevelBox">
                <div class="ulevel">${newsummonerLevel} </div>
                </div>
            </div>
            <div class="uidBox">
                <div class="uid">${newriotIdGameName}</div>
                </div>
            <div class="stmHleft">
                <div class="u-chart"><canvas id="donutChart" width="160px" height="160px"></canvas></div>
            </div>
        </div>
        </div>
        <div class='stmBlank'></div>
        </div>`

	$('.graph1').append(ccc)


	var ctx = document.getElementById('donutChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ['승리', '패배'],
			datasets: [{
				//				label: '승리',
				data: [win, lose], // 승리와 패배 데이터
				backgroundColor: [
					'rgba(75, 192, 192, 0.2)',
					'rgba(255, 99, 132, 0.2)'
				],
				borderColor: [
					'rgba(75, 192, 192, 1)',
					'rgba(255, 99, 132, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			responsive: false,
			legend: {
				position: 'bottom', // 범례 위치
			},
		}
	});




	for (let i in res) {
		let matchId = res[i]['matchId']


		sss = Number(i);
		let goBtn = sss + (data['matchCnt']) * 4

		var timeStamp = Date.now();
		gameEndTimestampString = res[i]["info"][0]['gameEndTimestamp']
		gameStartTimestampString = res[i]["info"][0]['gameStartTimestamp']

		gameEndTimestamp = Number(gameEndTimestampString)
		gameStartTimestamp = Number(gameStartTimestampString)

		loltime = (timeStamp - gameEndTimestamp) // ex) 몇일전입니다.

		ingametime = (gameEndTimestamp - gameStartTimestamp) // ex) 31분전 게임입니다.
		let day = Math.floor(loltime / 1000 / 60 / 60 / 24);
		let hour = Math.floor(loltime / 1000 / 60 / 60);
		let min = Math.floor(loltime / 1000 / 60);

		if (day == 0 && hour == 0) {
			spentTime = min + "분 전";
		} else if (day == 0) {
			spentTime = hour + "시간 전";
		} else {
			spentTime = day + "일 전";
		}
		let aaa = Math.floor(ingametime / 1000 / 60);
		ingamespentTime = aaa + "분 게임";

		//시작
		for (j in res[i]['info']) {
			if (res[i]["info"][j]['queueId'] == 450) {
				queue = "칼바람"
			} else if (res[i]["info"][j]['queueId'] == 490) {
				queue = "빠른대전"
			} else if (res[i]["info"][j]['queueId'] == 420) {
				queue = "솔로랭크"
			} else if (res[i]["info"][j]['queueId'] == 440) {
				queue = "자유랭크"
			} else if (res[i]["info"][j]['queueId'] == 1900) {
				queue = "우르프"
			}
			//			var container1 = document.getElementsByClassName("container1");

			if (data['gameName'] == res[i]["info"][j]['riotIdGameName'] || data['gameName'] == res[i]["info"][j]['summonerName']) {
				if (res[i]["info"][j]['win'] == '1') {
					win_lose = '승리'
					//					container1.style.backgroundColor = "rgba(255, 2, 73, 0.09)";
				} else {
					win_lose = '패배'
				}
				if (aaa < 5) {
					win_lose = '다시하기'
				}


				champimg = res[i]["info"][j]['championName']
				spellD = res[i]["info"][j]['summonerSpellD']
				spellF = res[i]["info"][j]['summonerSpellF']
				kills = res[i]["info"][j]['kills']
				deaths = res[i]["info"][j]['deaths']
				assists = res[i]["info"][j]['assists']
				if (deaths == 0) {
					kda = 'perfect';
				} else {
					kda = (((kills + assists)) / deaths).toFixed(2)
				}
				wardscore = res[i]["info"][j]['wardsKilled'] + res[i]["info"][j]['wardsPlaced']
				totalCs = res[i]["info"][j]['totalMinionsKilled'] + res[i]["info"][j]['totalAllyJungleMinionsKilled'] + res[i]["info"][j]['totalEnemyJungleMinionsKilled']
				if (data['gameName'] == res[i]["info"][j]['riotIdGameName'] || data['gameName'] == res[i]["info"][j]['summonerName']) {

					mykill = (((res[i]["info"][j]['kills'] + res[i]["info"][j]['assists']) / res[i]["info"][j]['totalTeamkills']) * 100).toFixed(0)

					if (res[i]['info'][j]['queueId'] != 450) {
						dragon = res[i]["info"][j]['dragon']
					} else {
						dragon = '포로간식'
					}


				}

			}


			if (data['gameName'] == res[i]["info"][j]['riotIdGameName'] || data['gameName'] == res[i]["info"][j]['summonerName']) {
				if (res[i]["info"][j]['win'] == '1') {
					str += `<div class="container1" id = 'container1'style='background-image:linear-gradient(315deg, #D6E5FC 0%, #BED8FE 74%) '>`

				} else {
					str += `<div class="container1" id = 'container1' style='background-image:linear-gradient(315deg, #FFD5F4 0%, #FFB3C8 74%)'>`

				}


			}

			if (data['gameName'] == res[i]["info"][j]['riotIdGameName'] || data['gameName'] == res[i]["info"][j]['summonerName']) {
				if (res[i]["info"][j]['win'] == '1') {
					str += `<div class='box-column' style='background-color:#75ABFD;width:10px;'></div>
					<div class="box-left" >
					<div><span style='font-weight:bold;'>${queue}</span></div>
					<div><span style='font-size:13px'>${spentTime}</span></div>
					<div><span style='color:blue;'>${win_lose}</span></div>
					<div><span style='font-size:13px'>${ingamespentTime}</span></div>
					</div>`

				} else {
					str += `<div class='box-column' style='background-color:#FF5E8A;width:10px;'></div>
					<div class="box-left" >
					<div><span style='font-weight:bold;'>${queue}</span></div>
					<div><span style='font-size:13px'>${spentTime}</span></div>
					<div><span style='color:red;'>${win_lose}</span></div>
					<div><span style='font-size:13px'>${ingamespentTime}</span></div>
					</div>`

				}
			}
		}
		str += `
				<div class="box-center1">
					<div class="champSepll">`

		if (champimg == "FiddleSticks") {
			champimg = "Fiddlesticks"
		}
		str += `<div class=box-center4><img width='80' height='80' style = "border-radius: 35px;"  alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'></div>
						<div class=box-center44>

							<div class="spell1"><img width='30' height='30'  style = "border-radius: 35px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellD}.png'></div>
							<div class="spell2"><img width='30' height='30'  style = "border-radius: 35px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellF}.png'></div>

						</div>
						<div class=box-right4 style="font-size: 13px;">${kills}/${deaths}/${assists}<br>${kda}:1평점</div>

					</div>
					<div class="item">
					
						<div class=itemStart>`
		for (j in res[i]['info']) {
			if (data['gameName'] == res[i]["info"][j]['riotIdGameName'] || data['gameName'] == res[i]["info"][j]['summonerName']) {
				for (let k = 0; k < 6; k++) {
					if (res[i]["info"][j]['item' + k] != 0) {
						str += `<img width='30' height='30' style = "border-radius: 35px;" alt='못 불러옴' src=https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${res[i]["info"][j]['item' + k]}.png>&nbsp;&nbsp;`
					}


				}
			}
		}
		str += `</div>
					</div>

				</div>

				<div class="box-center2" style="font-size: 13px;">
				<div class = "box-center2up">
				킬관여 ${mykill}%<br>
				시야 점수 ${wardscore}<br>
				cs ${totalCs}<br>
				D ${dragon}
				</div>
				<div class = "box-center2down" id = ${matchId}>
				
					 <img width=40 height=40 src="/img/lodinglogo.gif" alt="리플레이시작버튼">
				
				</div>	
						
				</div>
				<div class="box-center3">
				<div class="blueChamp">`
		for (j in res[i]['info']) {
			if (res[i]['info'][j]['teamId'] == 100) {
				let riotIdGameName = res[i]['info'][j]['riotIdGameName']
				let riotIdTagline = res[i]['info'][j]['riotIdTagline']
				let champimg = res[i]["info"][j]['championName']
				if (champimg == "FiddleSticks") {
					champimg = "Fiddlesticks"
				}
				if (riotIdGameName.length > 5) {
					riotIdGameName = riotIdGameName.substr(0, 5) + '...';
				}

				str += `<div style ="text-align: left;"><img width='17' height='17' style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'>
							
						<a  href='/stm/${riotIdGameName}/${riotIdTagline}'>	${riotIdGameName}</a>
							
							
								</div>`
				if (res[i]["info"][j]['win'] == '1') {
					blueWin = '승리'
				} else {
					blueWin = '패배'
				}
			}
		}
		str += `
					</div>
					<div class="redChamp">`
		for (j in res[i]['info']) {
			if (res[i]['info'][j]['teamId'] == 200) {
				let riotIdGameName = res[i]['info'][j]['riotIdGameName']
				let riotIdTagline = res[i]['info'][j]['riotIdGameName']
				let champimg = res[i]["info"][j]['championName']
				if (champimg == "FiddleSticks") {
					champimg = "Fiddlesticks"
				}
				if (riotIdGameName.length > 5) {
					riotIdGameName = riotIdGameName.substr(0, 5) + '...';
				}
				str += `<div style ="text-align: left;"><img width='17' height='17'  style = "border-radius: 30px;"  alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'>
			
				<a  href='/stm/${riotIdGameName}/${riotIdTagline}'>	${riotIdGameName}</a>
			</div>`
			}
			if (res[i]["info"][j]['win'] == '1') {
				redWin = '승리'
			} else {
				redWin = '패배'
			}
		}

		str += `
				</div>
				</div>`
		//		asdsaddadsasdasad
		for (j in res[i]['info']) {
			if (data['gameName'] == res[i]["info"][j]['riotIdGameName'] || data['gameName'] == res[i]["info"][j]['summonerName']) {
				if (res[i]["info"][j]['win'] == '1') {
					str += `<a href = ""><div class="box-right" style='background-color :#9ac2e2' id ="gamebtn${goBtn}" onclick ="gamebtn(${goBtn},'${matchId}')"><a href = 'javascript:;'><div class = "box-rightblue">∨</div></a></div>`

				} else {
					str += `<div class="box-right" style='background-color : rgba(255, 2, 73, 0.18)' id ="gamebtn${goBtn}" onclick ="gamebtn(${goBtn},'${matchId}')"><a href = 'javascript:;'><div class = "box-rightred">∨</div></a></div>`

				}
			}
		}



		str += `</div>
			<div class="line1" id = 'line1${goBtn}' style='display: none'></div>`
		str += `<div class="container2" id='container2${goBtn}' style='display: none'>
				<div class="legend">
					<div class="teamId" style=color:blue;>블루팀(${blueWin})</div>
					<div class=kda>	 <span tooltip="(kill+assist)/death"><a href = "#">kda</a></span>	</div>
					
					<div class=damage> <span tooltip="상대방에게 가한 (물리+마법)피해"><a href = "#">가한피해량</a></span></div>
					<div class=cs><span tooltip="게임에서 잡은 미니언의 총 개수"><a href = "#">cs</span></a></div>
					<div class=itemTeam><span tooltip="최종 구입한 총 아이템"><a href = "#">아이템</span></a></div>
					<div class=aicheck><span tooltip="인공지능 (Troller Check System)"><a href = "#">AI TCS</a></span></div>
					</div>`
		let damageToChampions = []
		for (j in res[i]['info']) {
			damageToChampions.push(res[i]["info"][j]['totalDamageDealtToChampions'])

		}
		highestdamageToChampions = Math.max(...damageToChampions)
		for (j in res[i]['info']) {
			champimg = res[i]["info"][j]['championName']
			if (champimg == "FiddleSticks") {
				champimg = "Fiddlesticks"
			}
			spellD = res[i]["info"][j]['summonerSpellD']
			spellF = res[i]["info"][j]['summonerSpellF']
			riotIdGameName = res[i]["info"][j]['riotIdGameName'];
			riotIdTagline = res[i]["info"][j]['riotIdTagline'];

			champion_name_kr = res[i]["info"][j]['champion_name_kr']
			kills = res[i]["info"][j]['kills']
			deaths = res[i]["info"][j]['deaths']
			assists = res[i]["info"][j]['assists']
			if (deaths == 0) {
				kda = 'perfect';
			} else {
				kda = (((kills + assists)) / deaths).toFixed(2)
			}
			totalDamageDealtToChampions = res[i]["info"][j]['totalDamageDealtToChampions']
			bartotalDamageDealtToChampions = ((totalDamageDealtToChampions / highestdamageToChampions) * 99).toFixed(0)
			physicalDamageDealtToChampions = ((res[i]["info"][j]['physicalDamageDealtToChampions'] / highestdamageToChampions) * 99).toFixed(0)
			magicDamageDealtToChampions = ((res[i]["info"][j]['magicDamageDealtToChampions'] / highestdamageToChampions) * 99).toFixed(0)

			totalCs = res[i]["info"][j]['totalMinionsKilled'] + res[i]["info"][j]['totalAllyJungleMinionsKilled'] + res[i]["info"][j]['totalEnemyJungleMinionsKilled']
			participantId = res[i]["info"][j]['participantId']
			if (res[i]['info'][j]['teamId'] == 100) {

				str += `<div class="ct1">
					<div class="teamId1">
						
						<div class=champImgM><div class = 'champaaa'></div><div>
						<span tooltip="${champion_name_kr}">
						<img title='${champion_name_kr}' width='30' height='30' style = "border-radius: 30px;" alt='못 불러옴' 
						src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'>
						</span>
						</div></div>
						<div class=spellM>
							<div class=c>
								<img width='20' height='20' style = "border-radius: 30px;" alt='못 불러옴' 
								src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellD}.png'>
							</div>
							<div class=spellM2><img width='20' height='20'  style = "border-radius: 30px;" alt='못 불러옴' 
								src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellF}.png'>
							</div>
						</div>
						<div class=nickNameM><div class = nickNameML></div><a  href='/stm/${riotIdGameName}/${riotIdTagline}'><div class = nickNameMR>${riotIdGameName}</div></a></div>
						
					</div>
					<div class=kda1>
						<div class=killDeathAssist>${kills}/${deaths}/${assists}</div>
						<div class="kdaCheck">${kda}:1</div>
					</div>
					<div class=damage1>
					<span tooltip="물리데미지 : ${res[i]["info"][j]['physicalDamageDealtToChampions']} | 마법데미지 : ${res[i]["info"][j]['magicDamageDealtToChampions']}">
					<div class=damage11>
					</span>
						<div class=damageAmountr style="flex-basis: ${physicalDamageDealtToChampions}%; background-Color: #8080c0; "  name = '${res[i]["info"][j]['physicalDamageDealtToChampions']}'></div>
						<div class=damageAmountl style="flex-basis: ${magicDamageDealtToChampions}%; background-Color: orange; "name =  '${res[i]["info"][j]['magicDamageDealtToChampions']}'></div>
						
					</div>
					
					<div class=damage111>
					<div class=damageGraph font-size: 10px; style="width: ${bartotalDamageDealtToChampions}%;">${totalDamageDealtToChampions}</div>

					</div>
						
				</div>
					<div class=cs1><div = class = "cs11">${totalCs}</div></div>
					<div class=itemTeamCheck>
						<div class=teamItem1>`

				for (let k = 0; k < 6; k++) {
					if (res[i]["info"][j]['item' + k] != 0) {
						str += `<img id = "${res[i]["info"][j]['item' + k]}" width='20' height='20' style = "border-radius: 30px;" alt='못 불러옴' src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${res[i]["info"][j]['item' + k]}.png" onmouseover="javascript:allItemTT(this.id)">&nbsp;&nbsp;`
					}
				}


				str += `</div>
					</div>
					<div class = aidetail id = ${matchId}` + `${participantId}><img width='20' height='20' alt='못 불러옴' src = "/img/loadingimg.gif"></div>
				</div>`
			}
		}
		str += `
		<div class="legend1">
					<div class="teamId" style=color:red;>레드팀(${redWin})</div>
					<div class=kda>	 <span tooltip="(kill+assist)/death"><a href = "#">kda</a></span>	</div>
					
					<div class=damage> <span tooltip="상대방에게 가한 (물리+마법)피해"><a href = "#">가한피해량</a></span></div>
					<div class=cs><span tooltip="게임에서 잡은 미니언의 총 개수"><a href = "#">cs</span></a></div>
					<div class=itemTeam><span tooltip="최종 구입한 총 아이템"><a href = "#">아이템</span></a></div>
					<div class=aicheck><span tooltip="인공지능 (Troller Check System)"><a href = "#">AI TCS</a></span></div>
					</div>`

		for (j in res[i]['info']) {
			//			console.log(res[i]['info'])


			champimg = res[i]["info"][j]['championName']
			if (champimg == "FiddleSticks") {
				champimg = "Fiddlesticks"
			}
			spellD = res[i]["info"][j]['summonerSpellD']
			spellF = res[i]["info"][j]['summonerSpellF']
			riotIdGameName = res[i]["info"][j]['riotIdGameName']
			champion_name_kr = res[i]["info"][j]['champion_name_kr']
			kills = res[i]["info"][j]['kills']
			deaths = res[i]["info"][j]['deaths']
			assists = res[i]["info"][j]['assists']
			kda = (((kills + assists)) / deaths).toFixed(2)
			totalDamageDealtToChampions = res[i]["info"][j]['totalDamageDealtToChampions']
			bartotalDamageDealtToChampions = (((totalDamageDealtToChampions / highestdamageToChampions) * 99)).toFixed(0)
			physicalDamageDealtToChampions = ((res[i]["info"][j]['physicalDamageDealtToChampions'] / highestdamageToChampions) * 99).toFixed(0)
			magicDamageDealtToChampions = ((res[i]["info"][j]['magicDamageDealtToChampions'] / highestdamageToChampions) * 99).toFixed(0)

			totalCs = res[i]["info"][j]['totalMinionsKilled'] + res[i]["info"][j]['totalAllyJungleMinionsKilled'] + res[i]["info"][j]['totalEnemyJungleMinionsKilled']
			participantId = res[i]["info"][j]['participantId']
			if (res[i]['info'][j]['teamId'] == 200) {

				str += `<div class="ct2">
					<div class="teamId1">

						<div class=champImgM><div class = 'champaaa'></div><div>
						<span tooltip="${champion_name_kr}">
						<img title='${champion_name_kr}' width='30' height='30' style = "border-radius: 30px;"  alt='못 불러옴' 
						src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'>
						</span>
						</div>	</div>
						<div class=spellM>
							<div class=spellM1>
								<img width='20' height='20'  alt='못 불러옴' style = "border-radius: 30px;" 
								src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellD}.png'>
							</div>
							<div class=spellM2><img width='20' height='20'  alt='못 불러옴' style = "border-radius: 30px;" 
								src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellF}.png'>
							</div>
						</div>
						<div class=nickNameM><div class = nickNameML></div><a  href='/stm/${riotIdGameName}/${riotIdTagline}'><div class = nickNameMR>${riotIdGameName}</div></a></div>
					</div>
					<div class=kda1>
						<div class=killDeathAssist>${kills}/${deaths}/${assists}</div>
						<div class="kdaCheck">${kda}:1</div>
					</div>
					<div class=damage1>
						<span tooltip="물리데미지 : ${res[i]["info"][j]['physicalDamageDealtToChampions']} | 마법데미지 : ${res[i]["info"][j]['magicDamageDealtToChampions']}">
					<div class=damage11>
					</span>
						<div class=damageAmountr style="flex-basis: ${physicalDamageDealtToChampions}%; background-Color: #8080c0; "  name = '${res[i]["info"][j]['physicalDamageDealtToChampions']}'></div>
						<div class=damageAmountl style="flex-basis: ${magicDamageDealtToChampions}%; background-Color: orange; "name =  '${res[i]["info"][j]['magicDamageDealtToChampions']}'></div> 	
					</div>
					
					<div class=damage111>
					<div class=damageGraph font-size: 10px; style="width: ${bartotalDamageDealtToChampions}%;">${totalDamageDealtToChampions}</div>

					</div>
						
				</div>
					<div class=cs1><div class = "cs11">${totalCs}</div></div>
					<div class=itemTeamCheck>
						<div class=teamItem1>`

				for (let k = 0; k < 6; k++) {
					if (res[i]["info"][j]['item' + k] != 0) {
						str += `<img width='20' height='20' style = "border-radius: 30px;"  alt='못 불러옴' src=https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${res[i]["info"][j]['item' + k]}.png>&nbsp;&nbsp;`
					}
				}

				str += `</div>
					</div>
					<div class = aidetail id = ${matchId}` + `${participantId}><img width=20 height='20' style = "border-radius: 30px;"  alt='못 불러옴' src = "/img/loadingimg.gif"></div>
				</div>`
			}
		}

		str += `</div>
		`
	}
	let str1 = `<div class='containerXR'></div><div class='more'>
					<center>
						<input type = "button" value = "" id = 'loadMore'class='loadMore'>
						
					</center>
				</div>`



	$('.containerXC').append(str)
	$('.containerXC').append(str1)
	for (let i in res) {
		//		console.log(i + "번째 파이썬 출발")
		data1 = { 'matchId': res[i].matchId }
		$.ajax({
			type: 'post',
			url: '/ai/timelineAni',
			data: data1,
			success: function(res) {
				console.log(res.matchId + "saved")

				html = `<a href="javascript:aiTimelineAni(\'${res.matchId}\');"><img width=80 height=40 src="/img/replay3.png" alt="리플레이시작버튼"> </a>`
				$('#' + res.matchId).html(html)
			}
		})
	}
}

//클릭시 타임라인 데이터 가지고 오기 , 모달열림
timeline_list = []
function aiTimelineAni(matchId) {
	timeline_list = []
	data = { 'matchId': matchId }
	$.ajax({
		type: 'post',
		url: '/ai/timelineInfo',
		data: data,
		success: function(res) {

			timeline_list.push(res)
			console.log(timeline_list)
			open()
		}
	})

}

window.addEventListener('click', (e) => {

	if (e.target.id == "loadMore") {
		console.log(moredata)
		console.log("실행됨");
		moredata['matchCnt']++;
		$('#loadMore').remove()
		bbb(moredata)
	}

});

//window.addEventListener('mouseover', (e) => {
//
//	if (e.target.className == "damageAmountr" || e.target.className == "damageAmountl") {
//
//		if (e.target.className == "damageAmountr") {
//			$('.pys-text').css("display","block")
//		} else if (e.target.className == "damageAmountl") {
//
//
//		}
//
//	}
//
//});


