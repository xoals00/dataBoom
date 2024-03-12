


let TOP = 0
let JUNGLE = 0
let MIDDLE = 0
let BOTTOM = 0
let UTILITY = 0
let IMGarr = []
function LaneChart(res) {
	//	console.log(res[0]['LanePrefer'])
	for (i in res[0]['LanePrefer']) {
		//		console.log(res[0]['LanePrefer'][i])
		if (res[0]['LanePrefer'][i]['teamPosition'] == 'TOP') {
			TOP += 1
		} else if (res[0]['LanePrefer'][i]['teamPosition'] == 'JUNGLE') {
			JUNGLE += 1
		} else if (res[0]['LanePrefer'][i]['teamPosition'] == 'MIDDLE') {
			MIDDLE += 1
		} else if (res[0]['LanePrefer'][i]['teamPosition'] == 'BOTTOM') {
			BOTTOM += 1
		} else if (res[0]['LanePrefer'][i]['teamPosition'] == 'UTILITY') {
			UTILITY += 1
		}
	}

	const array = [];
	for (i in res[0]['championPrefer']) {

		array.push(res[0]['championPrefer'][i])
	}

	let test = getElCount(array);
	let arr = [];
	// 0 판수 1 KDA 2 승패
	for (i in test) {
		for (const [key, val] of Object.entries(test[i])) {
			if (i == 0) { // 첫 리스트 생성
				arr.push([key, val]) // 판수
			} else { // 리스트 키 값 중복시 더하기
				for (j in arr) {
					if (arr[j][0] == key) {
						arr[j].push(val)
					}
				}
			}


		}
	}




	//	console.log(arr)
	//
	arr.sort((a, b) => b[1] - a[1])

	arr.slice(0, 3)

	//	console.log(arr.slice(0, 3))
	IMGarr = arr.slice(0, 3);


}


function getElCount(arr) {
	//	console.log(arr)
	i = 0
	let result = {}
	let kda = {}
	let win = {}
	for (const el of arr) {
		result[el['championName']] = (result[el['championName']] || 0) + 1;
		kda[el['championName']] = (kda[el['championName']] || 0) + Number(el['kda']);
		win[el['championName']] = (win[el['championName']] || 0) + Number(el['win']);
	}

	return [result, kda, win];
}

let profileIcon = ''
let summonerLevel = ''
let riotIdGameName = ''

function profileCheck(res) {

	//console.log(res)

	profileIcon = res.profileIcon
	summonerLevel = res.summonerLevel
	riotIdGameName = res.riotIdGameName
	championName = res.championName

	if (data['matchCnt'] == 1) { //최신 레벨과 플레이어 아이콘을 위해 저장
		newprofileIcon = profileIcon
		newsummonerLevel = summonerLevel
		newriotIdGameName = riotIdGameNames

	}



	goTier(gameName, tagLine)

	imgStr = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`

	ccc = `<div class=container333Box>
		<div class=container333>
		<div class="stmH">
			<div class = "sample"></div>
            <div class="stmHright">
                <div class="cpicon">
                    <div class = "cpimg">
						<img width='130' height='130' onerror="this.src= '${imgStr}';"; style = "border-radius: 30px;"  src=https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${newprofileIcon}.png>
                    </div>
                    	

                      
                         <div class="uidLevelBox">
              				  <div class="ulevel">${newsummonerLevel} </div>
                		</div>
                	    <div class="imimim"><div class = cpimgb><img width=300 height=300  src = "/img/effect/tierCome.gif" alt = "빛효과""></div></div>

                	
                		
                		
                    
                    </div>
               
            </div>
           
            <div class="stmHCenter">
            
           		<div class = "stmHCenterT">
           		
           		</div>
            	<div class = "stmHCenterB">
            	
            	</div>
            </div>
               
            <div class="stmHleft">
                <div class="u-chart"><canvas id="donutChart" ></canvas></div>
            </div>
        </div>
        </div>
        <div class='stmBlank'>
        	<div class='stmBlankT'>
        		<div class='stmBlankTM' >
        			선호 포지션(랭크)
        		</div>
        	</div>
        	<div class='stmBlankB'>
	        	<div class = 'stmBlankM'>
		        	<div class = 'stmBlankG' tooltip = '${TOP}'> 
		        		<div class = 'stmBlankGtop'>
		        			<div class = 'stmBlankGTM'></div>
			        		<div class = 'stmBlankGTM1' ></div>
		        		</div>
		        		<div class = 'stmBlankGbottom'  tooltip="탑" >
		        			<img src='/img/top.png' style='width: 20px; height: 20px; border : 1px soild white'>
		        		</div>
		        	
		        	</div>	
			       	      	<div class = 'stmBlankG' tooltip = '${JUNGLE}'> 
		        		<div class = 'stmBlankGtop'>
		        			<div class = 'stmBlankGTM'></div>
			        		<div class = 'stmBlankGTM2'></div>
		        		</div>
		        		<div class = 'stmBlankGbottom' tooltip="정글">
		        			<img  src='/img/jug.png' style='width: 20px; height: 20px;'>
		        		</div>
		        	
		        	</div>
		        	      	<div class = 'stmBlankG' tooltip = '${MIDDLE}'> 
		        		<div class = 'stmBlankGtop'>
		        			<div class = 'stmBlankGTM'></div>
			        		<div class = 'stmBlankGTM3'></div>
		        		</div>
		        		<div class = 'stmBlankGbottom' tooltip="미드">
		        			<img  src='/img/mid.png' style='width: 20px; height: 20px;'>
		        		</div>
		        	
		        	</div>
		        	      	<div class = 'stmBlankG' tooltip = '${BOTTOM}'> 
		        		<div class = 'stmBlankGtop'>
		        			<div class = 'stmBlankGTM'></div>
			        		<div class = 'stmBlankGTM4'></div>
		        		</div>
		        		<div class = 'stmBlankGbottom'tooltip="원딜">
		        			<img  src='/img/adc.png' style='width: 20px; height: 20px;'>
		        		</div>
		        	
		        	</div>
		        	      	<div class = 'stmBlankG' tooltip = '${UTILITY}'> 
		        		<div class = 'stmBlankGtop'>
		        			<div class = 'stmBlankGTM'></div>
			        		<div class = 'stmBlankGTM5'></div>
		        		</div>
		        		<div class = 'stmBlankGbottom' tooltip="서폿">
		        			<img  src='/img/sup.png' style='width: 20px; height: 20px;'>
		        		</div>
		        	
		        	</div>
	        	</div>
        	</div>
        </div>
        </div>`

	$('.graph1').append(ccc)

	setTimeout(function() {

		uid = `<div class="uid">${newriotIdGameName}</div>`
		$('.cpicon').prepend(uid)
		$('.uid').hide()
		$('.uid').fadeIn(1000)

	}, 1500);




	if (nowStatus == "ALL") {

		lightEffect = `<div class = cpimgb><img width=300 height=300  src = "/img/effect/tierCome.gif" alt = "빛효과""></div>`
		$('.imimim').html(lightEffect)
	} else {
		lightEffect = `<img width=300 height=300 src='/img/tier/${tier}.png' alt='티어''>`
		$('.imimim').html(lightEffect)
	}


	championName
	imgStr = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`
	//
	var Pa = document.querySelector('.container333Box');
	var ch = document.createElement('div'); // 가상 요소 생성
	ch.classList.add('img');
	Pa.appendChild(ch); // 가상 요소를 실제 요소에

	ch.style.width = "100%";
	ch.style.height = "100%";
	ch.style.opacity = 0.6;
	ch.style.zIndex = -1;
	ch.style.position = "absolute";
	//	ch.style.backgroundSize = "cover";
	ch.style.backgroundPosition = "30% 10%";
	ch.style.backgroundImage = "no-repeat";
	ch.style.backgroundImage = "url(" + imgStr + ")";

	contentsCheckBox = `
	
		<div class = contentsCheckM>
			<div class = contentsCheckS>
				 	
				  <div class = "contentsDetailL">
					
				  </div>
				  <div class="GoPart">
				   <ul class="menu2">
				   					    <li class = "sampletest"><a href="javascript:reload(\'${gameName}\',\'${tagLine}\',0)">전체</a></li>				  

				    </ul>
				  </div>
				  	
				  <div class = "contentsDetailR">
				  <ul class="menu3">
									    <li class = "sampletest"><a href="/stm/${gameName}/${tagLine}">최신 업데이트</a></li>				  
					</ul>
				  </div> 
			</div>
		</div>
		
		`

	$('.contetnsCheckA').html(contentsCheckBox)
}




//<canvas id="LaneChart" width="593" height="198"></canvas> //stmBlank안에 들어갈 구글chart.js

$('a.feellink').click(function(e) //a태그 눌러도 맨위로 안올라감
{
	e.preventDefault();
});

let ccc = ''
let win = 0
let lose = 0

let matchId = ''
let ingamespentTime = ''
let spentTime = ''
let queue = ''
let spendTime = '' //aaa
let win_lose = ''
let champimg = ''
let spellD = ''
let spellF = ''

let kills = ''
let deaths = ''
let assists = ''
let kda = ''
let wardscore = ''
let totalCs = ''
let mykill = ''

let dragon = ''
let str = ''
let str1 = ''

let itemstart = ''
let resMyList = []
let goBtn = 0

let myriotIdGameName = ''
let myriotIdTagline = ''

let graphCnt = 0
let graphwin = 0
let graphlose = 0

let gameName = ''
let tagLine = ''
let matchCnt = 1
let queueId = 0
let nowStatus = 'ALL'

let tier = ''
function showGameTamble(res) {
		console.log(res)


	$('.graph1').empty()
	resMyList = []
	for (let i in res) {
		for (let j in res[i]['info']) {

			resGameNamer = res[i]["info"][j]['riotIdGameName'] // 검색된 아이디
			//			console.log(resGameNamer, i , j)
			resGameNamerSo = res[i]["info"][j]['riotIdGameName'].toLowerCase(); //검색된 아이디의 소문자
			gameNameSo = gameName.toLowerCase();;//검색한 아이디의 소문자

			gameNameList = [resGameNamerSo, resGameNamer]

			if (gameNameList.includes(gameNameSo)) {
				//								console.log("찾음")
				//								console.log(gameName)
				//								console.log(res[i]["info"][j]['riotIdGameName'])
				//

				resMyList.push(res[i]["info"][j])

				myriotIdGameName = res[i]["info"][j]['riotIdGameName']

				riotIdGameNames = res[i]["info"][j]['riotIdGameName']
				myriotIdTagline = res[i]["info"][j]['riotIdTagline']
				tagLine = res[i]["info"][j]['riotIdTagline']
				if (res[i]['info'][j]['win'] == '1') {
					win += 1
				} else {
					lose += 1
				}


			}

		}
	}
	//	console.log(resMyList[0])
	//	if (resMyList[0].length == 0) { //혹시 모를 에러를 위한 에러페이지전용
	//
	//		location.href = '/searchError'
	//	} else {
	profileCheck(resMyList[0])

	//	}


	//console.log(allOfList)
	//	console.log(IMGarr)
	graphwin = 0
	graphlose = 0
	graphCnt = 0
	for (i in IMGarr) {

		win = IMGarr[i][3]
		lose = IMGarr[i][1] - IMGarr[i][3]
		kda = (IMGarr[i][2] / IMGarr[i][1]).toFixed(2)

		str = `<div class = "champeAndKda"><img style='width: 50px; height: 50px; border-radius : 50%; border : 1px solid ' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${IMGarr[i][0]}.png'>
		<div class = "champeAndKdaKor">&ensp; (${win}승 ${lose}패) ${kda} :평점 </div></div><br>
		`
		$(".stmHCenterB").append(str)
		graphwin += win
		graphlose += lose
		graphCnt += IMGarr[i][1]
	}
	str = `	최근 솔로랭크(${graphCnt}게임)`
	$(".stmHCenterT").append(str)

	for (let i in resMyList) {
		goBtn = Number(i) + (data['matchCnt']) * 4
		Myres = resMyList[i] // 추후에 i 으로 바꾸기

		//		console.log(Myres)
		timecheck(Myres)//몇시간전,몇분게임
		champion_name_kr = Myres.champion_name_kr
		matchId = Myres.matchId
		queuecheck(Myres)
		win_losecheck(Myres)

		champimg = Myres.championName

		spellD = Myres.summonerSpellD
		spellF = Myres.summonerSpellF
		kills = Myres.kills
		deaths = Myres.deaths
		assists = Myres.assists

		if (deaths == 0) {
			kda = (kills + assists) + 'perfect';
		} else {
			kda = (((kills + assists)) / deaths).toFixed(2)
		}
		wardscore = Myres.wardsKilled + Myres.wardsPlaced
		totalCs = Myres.totalMinionsKilled + Myres.totalAllyJungleMinionsKilled + Myres.totalEnemyJungleMinionsKilled

		mykill = (((kills + assists) / Myres.totalTeamkills) * 100).toFixed(0)

		if (champimg == "FiddleSticks") {
			champimg = "Fiddlesticks"
		}

		if (Myres.win == 1) {
			str = `<div class="container1" id = '${matchId}container1' style='background-image:linear-gradient(315deg, #D6E5FC 0%, #BED8FE 74%) '>`

			str1 = `<div class='box-columna' ></div>

				<div class="box-left" >
								<div class="queuety_tm">${queue}</div>
								<div class="stime-tm">${spentTime}</div>
								<div class="winlose-tmb">${win_lose}</div>
								<div class="igstime-tm">${ingamespentTime}</div>
								</div>`
			boxright = `<div tooltip="click! more Detail!" class="box-right" style='background-color :#9ac2e2' id ="gamebtn${goBtn}" onclick ="gamebtn(${goBtn},'${matchId}')"><a href = 'javascript:;'><div class = "box-rightblue">∨</div></a></div>`
		} else {
			str = `<div class="container1" id ='${matchId}container1' style='background-image:linear-gradient(315deg, #FFD5F4 0%, #FFB3C8 74%)'>`
			str1 = `<div class='box-columnb'></div>
											<div class="box-left" >
											<div class="queuety_tm">${queue}</div>
											<div class="stime-tm">${spentTime}</div>
											<div class="winlose-tmr">${win_lose}</div>
											<div class="igstime-tm">${ingamespentTime}</div>
											</div>`
			boxright = `<div tooltip="click! more Detail!" class="box-right" style='background-color : rgba(255, 2, 73, 0.18)' id ="gamebtn${goBtn}" onclick ="gamebtn(${goBtn},'${matchId}')"><a href = 'javascript:;'><div class = "box-rightred">∨</div></a></div>`

		}

		let boxcenter1 = `	<div class="box-center1">
								<div class="champSepll">
									<div class="box-center4" tooltip="${champion_name_kr}" id = '${matchId}box-center4'></div>
									
									<div class="box-center44">
										<div class="spell1" id = '${matchId}spell1'></div>
										<div class="spell2" id = '${matchId}spell2'></div>
									</div>
									<div class="box-right4"  id = '${matchId}boxright4'>
									</div>
								</div>
								
								<div class="item">
									<div class="itemStart" id = '${matchId}itemStart'>
									</div>
								</div>
									
							</div>
							<div class="box-center2">
								<div class="box-center2up" id = '${matchId}center2up'></div>
								<div class="box-center2down"  id = '${matchId}'></div>
							</div>
							<div class="box-center3">
								<div class="blueChamp" id = '${matchId}blueChamp'></div>
								<div class="redChamp" id = '${matchId}redChamp'></div>
							</div>
								${boxright}
							</div>
							`
		container2 = `<div class="container2" id = 'container2${matchId}' >`
		container4 = `<div class="container4" id = 'container4${matchId}' >`
		controller = `<div class = "controller" id = 'controller${matchId}'><div>`
		$('.containerXCF').append(str)


		//		$(".box-right").css("background-image","linear-gradient(315deg, #D6E5FC 0%, #BED8FE 74%)")
		//		$(".box-right").css("background-image","linear-gradient(315deg, #D6E5FC 0%, #BED8FE 74%)")


		$('#' + matchId + 'container1').append(str1)
		$('#' + matchId + 'container1').append(boxcenter1)

		championimg = `<img width='80' height='80' style = "border-radius: 35px;"  alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'></div>`
		$('#' + matchId + 'box-center4').append(championimg)

		spell1 = `<img width='30' height='30'  style = "border-radius: 35px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellD}.png'>`
		spell2 = `<img width='30' height='30'  style = "border-radius: 35px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellF}.png'>`

		$('#' + matchId + 'spell1').append(spell1)
		$('#' + matchId + 'spell2').append(spell2)

		boxright4 = `${kills}/${deaths}/${assists}<br>${kda}:1평점`

		$('#' + matchId + 'boxright4').append(boxright4)
		//////특수효과 시작 /////////
		if (kda > 4) { //테두리 불꽃

			$('#' + matchId + 'container1').css("border-image-source", "url(/img/effect/b2.gif)")
			$('#' + matchId + 'boxright4').css("color", "red")
			$('#' + matchId + 'boxright4').css("font-weight", "bold")
			$('#' + matchId + 'container1').css({
				"background-image": "url(/img/effect/back1.jpg)",
				"background-repeat": "no-repeat",
				"background-position": "center center",
				"background-size": "1500px 700px"
			});
		}
		//////특수효과 끝/////////
		let itemstart = ''
		for (let k = 0; k < 6; k++) {

			let itemk = 'item' + k

			if (Myres[itemk] != 0) {
				itemimg = Myres[itemk]

				itemstart += '<img id = "' + itemimg + '_' + matchId + '" class = "jb-title-tm" width=30 height=30 style = "border-radius: 35px;" alt="못 불러옴" src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/' + itemimg + '.png" onmouseover="javascript:allItemTT(this.id)"><p class = "jb-text-tm"></p>&nbsp;&nbsp;&nbsp;'

			}

		}

		$('#' + matchId + 'itemStart').append(itemstart)


		boxcenter2up = `	
							킬관여 ${mykill}%<br>
							시야 점수 ${wardscore}<br>
							cs ${totalCs}<br>
							D ${dragon}
						`
		$('#' + matchId + 'center2up').append(boxcenter2up)

		boxcenter2down = `<a href="javascript:aiTimelineAni(\'${matchId}\');"><img width=40 height=40 src="/img/lodinglogo.gif" alt="리플레이시작버튼"> </a>`

		$('#' + matchId).append(boxcenter2down)
		let bcList = ''
		let rcList = ''
		for (let i in res) {

			for (j in res[i]['info']) {
				if (res[i]['info'][j]['teamId'] == 100 && res[i]['matchId'] == matchId) {
					let riotIdGameName = res[i]['info'][j]['riotIdGameName']
					let riotIdTagline = res[i]['info'][j]['riotIdTagline']
					let champimg = res[i]["info"][j]['championName']
					if (champimg == "FiddleSticks") {
						champimg = "Fiddlesticks"
					}
					if (riotIdGameName.length > 10) {
						riotIdGameName1 = riotIdGameName.substr(0, 10) + '...';
					} else {
						riotIdGameName1 = riotIdGameName

					}
					bcList += `<div style ="text-align: left;"><img width='17' height='17' style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'>
							
										<a  href='/stm/${riotIdGameName}/${riotIdTagline}'>	${riotIdGameName1}</a>
													
								</div>`

				} else if (res[i]['info'][j]['teamId'] == 200 && res[i]['matchId'] == matchId) {
					let riotIdGameName = res[i]['info'][j]['riotIdGameName']
					let riotIdTagline = res[i]['info'][j]['riotIdTagline']
					let champimg = res[i]["info"][j]['championName']
					if (champimg == "FiddleSticks") {
						champimg = "Fiddlesticks"
					}
					if (riotIdGameName.length > 10) {
						riotIdGameName1 = riotIdGameName.substr(0, 10) + '...';
					} else {
						riotIdGameName1 = riotIdGameName

					}
					rcList += `<div style ="text-align: left;"><img width='17' height='17' style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champimg}.png'>
							
									<a  href='/stm/${riotIdGameName}/${riotIdTagline}'>	${riotIdGameName1}</a>
											
								</div>`
				}
			}

		}
		$('#' + matchId + 'blueChamp').append(bcList)
		$('#' + matchId + 'redChamp').append(rcList)
		$('.containerXCF').append(controller)

		//
		//		$('#controller' + matchId).append(container2)
		//		$('#controller' + matchId).append(container4)


		data1 = { 'matchId': matchId }
		$.ajax({
			type: 'post',
			url: '/ai/timelineAni',
			data: data1,
			success: function(res) {

				//				console.log(res)
				html = `<div  tooltip="리플레이는 회원만 가능합니다." ><a href="javascript:aiTimelineAni(\'${res.matchId}\');"><img width=80 height=40 src="/img/replay3.png" alt="리플레이시작버튼"> </a></div>`
				$('#' + res.matchId).html(html)
			}
		})
	}
	gameName = myriotIdGameName
	tagLine = myriotIdTagline

	$(".loadMore").focus();
	modNum = $('#modNum').text()

	if (modNum == 0) {
		$('.uid').css("color", "white")
	}
	barT = 100 - (TOP * 5)
	barJ = 100 - (JUNGLE * 5)
	barM = 100 - (MIDDLE * 5)
	barB = 100 - (BOTTOM * 5)
	barU = 100 - (UTILITY * 5)
	$('.stmBlankGTM1').css("height", barT + "%")
	$('.stmBlankGTM2').css("height", barJ + "%")
	$('.stmBlankGTM3').css("height", barM + "%")
	$('.stmBlankGTM4').css("height", barB + "%")
	$('.stmBlankGTM5').css("height", barU + "%")


	showgraph(graphwin, graphlose)

	findPartOfQueuId()
	$('#loadMore').show()
}


function showGameTambleBody(matchId) {
	//	console.log(matchId)

	let blueChampList = [] //matchId의 블루 리스트
	let redChampList = []//matchId의 레드 리스트


	for (let i in allofList) {

		if (matchId == allofList[i]['matchId']) {

			for (let j in allofList[i]['info']) {


				if (allofList[i]['info'][j]['teamId'] == 100) {


					blueChampList.push(allofList[i]['info'][j])

				} else {

					redChampList.push(allofList[i]['info'][j])
				}
			}
		}
	}
	//	console.log(blueChampList)

	makeBodyblue(blueChampList, matchId);
	makeBodyred(redChampList, matchId);


}
//들어오는 값은 레드리스트
function makeBodyred(blueChampList, matchId) {
	//	console.log(blueChampList)
	teamId = '';
	//	console.log(blueChampList)
	if (blueChampList[0]['win'] == '1') {
		blueWin = '승리'
	} else {
		blueWin = '패배'
	}

	legend = `<div class="legend" id = '${matchId}legend2' ></div>`

	$('#container4' + matchId).append(legend);

	if (blueChampList[0]['teamId'] == 100) {
		teamId = `<div class="teamId" style=color:blue;>블루팀(${blueWin})</div>`
	} else {
		teamId = `<div class="teamId" style=color:red;>레드팀(${blueWin})</div>`

	}
	//여기서부터 시작
	champBody = `  
					${teamId}
					<div class=kda>	 <span class = "kda_tm" tooltip="(kill+assist)/death"><a href = "#">KDA</a></span>	</div>

					<div class=damage> <span class = "dmg_tm" tooltip="상대방에게 가한 (물리+마법)피해"><a href = "#">데미지</a></span></div>
					<div class=cs><span class = "minion_tm" tooltip="게임에서 잡은 미니언의 총 개수"><a href = "#">cs</span></a></div >
					<div class=itemTeam><span class = "pchit_tm" tooltip="최종 구입한 총 아이템"><a href="#">아이템</span></a></div >
					<div class=aicheck><span class = "ai_tm" tooltip="인공지능 (Troller Check System)"><a href="#">AI TCS</a></span></div>
					
				`
	$('#' + matchId + 'legend2').append(champBody)

	let ct2 = ''
	for (let i in blueChampList) {

		champion_name_kr = blueChampList[i]['champion_name_kr']
		championName = blueChampList[i]['championName']
		spellD = blueChampList[i]['summonerSpellD']
		spellF = blueChampList[i]['summonerSpellF']
		kills = blueChampList[i]['kills']
		deaths = blueChampList[i]['deaths']
		assists = blueChampList[i]['assists']
		kda = blueChampList[i]['kda']
		physicalDamageDealtToChampions = blueChampList[i]['physicalDamageDealtToChampions']
		magicDamageDealtToChampions = blueChampList[i]['magicDamageDealtToChampions']
		totalDamageDealtToChampions = parseInt(physicalDamageDealtToChampions) + parseInt(magicDamageDealtToChampions)
		physicalDamagePercent = ((physicalDamageDealtToChampions / totalDamageDealtToChampions) * 100).toFixed(0)
		magicDamagePercent = ((magicDamageDealtToChampions / totalDamageDealtToChampions) * 100).toFixed(0)
		totalMinionsKilled = blueChampList[i]['totalMinionsKilled']
		participantId = blueChampList[i]['participantId']
		riotIdGameName = blueChampList[i]['riotIdGameName']
		riotIdTagline = blueChampList[i]['riotIdTagline']




		let OnePersonitem = ''
		for (let k = 0; k < 6; k++) {
			if (blueChampList[i]['item' + k] != 0) {

				blueitem = blueChampList[i]['item' + k]
				OnePersonitem += `<img width='20' height='20' style = "border-radius: 30px;" alt='못 불러옴' src=https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${blueitem}.png>&nbsp;`
			}
		}
		if (riotIdGameName.length > 4) {
			riotIdGameName1 = riotIdGameName.substr(0, 4) + '...';
		} else {
			riotIdGameName1 = riotIdGameName

		}
		if (championName == "FiddleSticks") {
			championName = "Fiddlesticks"
		}
		//		console.log(championName)
		ct2 += `<div class = 'ct2'>
					<div class = 'teamId1'>
						<div class = 'champImgM'>
							<div class = 'champaaa'></div>
							<div>
								<span tooltip = "${champion_name_kr}">
								<img title="${champion_name_kr}" width='30' height='30' style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${championName}.png'>
							</span>
							</div>
						</div>
						<div class = 'spellM'>
							<div class = 'c'>
								<img width='20' height='20' style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellD}.png'>
							</div>
							<div class = 'spellM2'>
								<div class=spellM2><img width='20' height='20'  style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellF}.png'>
							</div>
						
						</div>
					</div>
						<div class = 'nickNameM'>
							<div class = 'nickNameML'></div>
							<a href='/stm/${riotIdGameName}/${riotIdTagline}'>
								<div class = nickNameMR>${riotIdGameName1}</div>
								</a>
							</div>
						
						
					</div>
					<div class = 'kda1'>
						<div class = 'killDeathAssist'>${kills}/${deaths}/${assists}</div>
						<div class = 'kdaCheck'>${kda}:1</div>
					</div>
					<div class = 'damage1'>
						<span tooltip="물리데미지 : ${physicalDamageDealtToChampions} | 마법데미지 : ${magicDamageDealtToChampions}">
							<div class = "damage11">
								<div class=damageAmountr style="flex-basis: ${physicalDamagePercent}%; background-Color: #8080c0; "  name = '${physicalDamageDealtToChampions}'></div>
								<div class=damageAmountl style="flex-basis: ${magicDamagePercent}%; background-Color: orange; "name =  '${magicDamageDealtToChampions}'></div>
							</div>
							<div class = "damage111">
									<div class = "damageGraph" font-size:10px; style="width:100%;"> ${totalDamageDealtToChampions} </div>
							</div>
						</span>
					</div>
					<div class = 'cs1'>
						<div class = 'cs11'>
							${totalMinionsKilled}
						</div>
					</div>
					<div class = 'itemTeamCheck'>
						<div class = 'teamItem1'>
								${OnePersonitem}
						</div>
					</div>
					
					<div class = aidetail id = ${matchId}` + `${participantId}>
						<img width='20' height='20' alt='못 불러옴' src = "/img/loadingimg.gif"></div>
					</div>
				</div>`
	}


	$('#container4' + matchId).append(ct2)


}


function makeBodyblue(blueChampList, matchId) {
	//	console.log(blueChampList)
	teamId = '';
	if (blueChampList[0]['win'] == '1') {
		blueWin = '승리'
	} else {
		blueWin = '패배'
	}

	legend = `<div class="legend" id = '${matchId}legend' ></div>`

	$('#container2' + matchId).append(legend);

	if (blueChampList[0]['teamId'] == 100) {
		teamId = `<div class="teamId" style=color:blue;>블루팀(${blueWin})</div>`
	} else {
		teamId = `<div class="teamId" style=color:red;>레드팀(${blueWin})</div>`

	}

	//여기서부터 시작
	champBody = `  
					${teamId}
					<div class=kda>	 <span class = "kda_tm" tooltip="(kill+assist)/death"><a href = "#">KDA</a></span>	</div>

					<div class=damage> <span class = "dmg_tm" tooltip="상대방에게 가한 (물리+마법)피해"><a href = "#">데미지</a></span></div>
					<div class=cs><span class = "minion_tm" tooltip="게임에서 잡은 미니언의 총 개수"><a href = "#">cs</span></a></div >
					<div class=itemTeam><span class = "pchit_tm" tooltip="최종 구입한 총 아이템"><a href="#">아이템</span></a></div >
					<div class=aicheck><span class = "ai_tm" tooltip="인공지능 (Troller Check System)"><a href="#">AI TCS</a></span></div>
					
				`
	$('#' + matchId + 'legend').append(champBody)

	let ct1 = ''
	for (let i in blueChampList) {

		champion_name_kr = blueChampList[i]['champion_name_kr']
		championName = blueChampList[i]['championName']
		spellD = blueChampList[i]['summonerSpellD']
		spellF = blueChampList[i]['summonerSpellF']
		kills = blueChampList[i]['kills']
		deaths = blueChampList[i]['deaths']
		assists = blueChampList[i]['assists']
		kda = blueChampList[i]['kda']
		physicalDamageDealtToChampions = blueChampList[i]['physicalDamageDealtToChampions']
		magicDamageDealtToChampions = blueChampList[i]['magicDamageDealtToChampions']
		totalDamageDealtToChampions = parseInt(physicalDamageDealtToChampions) + parseInt(magicDamageDealtToChampions)


		physicalDamagePercent = ((physicalDamageDealtToChampions / totalDamageDealtToChampions) * 100).toFixed(0)
		magicDamagePercent = ((magicDamageDealtToChampions / totalDamageDealtToChampions) * 100).toFixed(0)
		totalMinionsKilled = blueChampList[i]['totalMinionsKilled']
		participantId = blueChampList[i]['participantId']
		riotIdGameName = blueChampList[i]['riotIdGameName']
		riotIdTagline = blueChampList[i]['riotIdTagline']


		if (championName == "FiddleSticks") {
			championName = "Fiddlesticks"
		}

		let OnePersonitem = ''
		for (let k = 0; k < 6; k++) {
			if (blueChampList[i]['item' + k] != 0) {

				blueitem = blueChampList[i]['item' + k]
				OnePersonitem += `<img width='20' height='20' style = "border-radius: 30px;" alt='못 불러옴' src=https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${blueitem}.png>&nbsp;`
			}
		}
		if (riotIdGameName.length > 4) {
			riotIdGameName1 = riotIdGameName.substr(0, 4) + '...';
		} else {
			riotIdGameName1 = riotIdGameName

		}

		//		console.log(championName)
		ct1 += `<div class = 'ct1'>
					<div class = 'teamId1'>
						<div class = 'champImgM'>
							<div class = 'champaaa'></div>
							<div>
								<span tooltip = "${champion_name_kr}">
								<img title="${champion_name_kr}" width='30' height='30' style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${championName}.png'>
							</span>
							</div>
						</div>
						<div class = 'spellM'>
							<div class = 'c'>
								<img width='20' height='20' style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellD}.png'>
							</div>
							<div class = 'spellM2'>
								<div class=spellM2><img width='20' height='20'  style = "border-radius: 30px;" alt='못 불러옴' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/${spellF}.png'>
							</div>
						
						</div>
					</div>
						<div class = 'nickNameM'>
							<div class = 'nickNameML'></div>
							<a href='/stm/${riotIdGameName}/${riotIdTagline}'>
								<div class = nickNameMR>${riotIdGameName1}</div>
								</a>
							</div>
						
						
					</div>
					<div class = 'kda1'>
						<div class = 'killDeathAssist'>${kills}/${deaths}/${assists}</div>
						<div class = 'kdaCheck'>${kda}:1</div>
					</div>
					<div class = 'damage1'>
						<span tooltip="물리데미지 : ${physicalDamageDealtToChampions} | 마법데미지 : ${magicDamageDealtToChampions}">
							<div class = "damage11">
								<div class=damageAmountr style="flex-basis: ${physicalDamagePercent}%; background-Color: #8080c0; "  name = '${physicalDamageDealtToChampions}'></div>
								<div class=damageAmountl style="flex-basis: ${magicDamagePercent}%; background-Color: orange; "name =  '${magicDamageDealtToChampions}'></div>

							</div>
							<div class = "damage111">
									<div class = "damageGraph" font-size:10px; style="width:100%;"> ${totalDamageDealtToChampions} </div>
							</div>
						</span>
					</div>
					<div class = 'cs1'>
						<div class = 'cs11'>
							${totalMinionsKilled}
						</div>
					</div>
					<div class = 'itemTeamCheck'>
						<div class = 'teamItem1'>
								${OnePersonitem}
						</div>
					</div>
					
					<div class = aidetail id = ${matchId}` + `${participantId}>
						<img width='20' height='20' alt='못 불러옴' src = "/img/loadingimg.gif"></div>
					</div>
				</div>`
	}


	$('#container2' + matchId).append(ct1)

}

//클릭시 타임라인 데이터 가지고 오기 , 모달열림
timeline_list = []
function aiTimelineAni(matchId) {

	userId = $('#userId').val();

	//	console.log(userId)
	if (userId == '') {

		alert("로그인 후 이용 가능합니다.")
		return false;
	}
	timeline_list = []
	data = { 'matchId': matchId }
	$.ajax({
		type: 'post',
		url: '/ai/timelineInfo',
		data: data,
		success: function(res) {

			timeline_list.push(res)
			//			console.log(timeline_list)
			open()
			liveReplay()
			$('#replayStart').css("visibility", "hidden");


			$('.center-box2').empty()
		}
	})

}

//window.addEventListener('click', (e) => {
//	
//	console.log(nowStatus)
//
//	if (e.target.id == "loadMore") {
//
//	}
//});




function timecheck(res) {

	var timeStamp = Date.now();
	gameEndTimestampString = res['gameEndTimestamp']
	gameStartTimestampString = res['gameStartTimestamp']

	gameEndTimestamp = Number(gameEndTimestampString)
	gameStartTimestamp = Number(gameStartTimestampString)

	loltime = (timeStamp - gameEndTimestamp) // ex) 몇일전입니다.

	ingametime = (gameEndTimestamp - gameStartTimestamp) // ex) 31분전 게임입니다.
	spendTime = Math.floor(ingametime / 1000 / 60);
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

	ingamespentTime = spendTime + "분 게임";

}
function queuecheck(res) {

	dragon = '포로간식'
	if (res.queueId == 450) {
		queue = "칼바람"
		dragon = res.dragon
	} else if (res.queueId == 490) {
		queue = "빠른대전"
	} else if (res.queueId == 420) {
		queue = "솔로랭크"
	} else if (res.queueId == 440) {
		queue = "자유랭크"
	} else if (res.queueId == 1900) {
		queue = "우르프"
	}

}
function queuecheckInt(queue) {
	//	console.log(queue)
	if (queue == "ALL") {
		queueId = 0
	} else if (queue == "솔로랭크") {
		queueId = 420
	} else if (queue == "칼바람") {
		queueId = 450
	} else if (queue == "빠른대전") {
		queueId = 490
	} else if (queue == "자유랭크") {
		queueId = 440
	} else if (queue == "우르프") {
		queueId = 1900
	} else if (queue == "아레나") {
		queueId = 1700
	}else if (queue == "격전") {
		queueId = 700
	}
	return queueId

}
function queueChange(queueId) {

	if (queueId == 450) {
		queue = "칼바람"
	} else if (queueId == 490) {
		queue = "빠른대전"
	} else if (queueId == 420) {
		queue = "솔로랭크"
	} else if (queueId == 440) {
		queue = "자유랭크"
	} else if (queueId == 1900) {
		queue = "우르프"
	} else if (queueId == 0) {
		queue = "ALL"
	} else if (queueId == 1700) {
		queue = "아레나"
	}else if (queueId == 700) {
		queue = "격전"
	}

	return queue
}


function win_losecheck(res) {
	if (res.win == '0') {
		win_lose = '패배'
	} else if (res.win == '1') {
		win_lose = '승리'
	}

	if (spendTime < 5) {
		win_lose = '다시하기'
	}
}