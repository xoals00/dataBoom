/**
 * 
 */

///////////////////////////////모달/////////////////////////////////////

const modal_wrap = document.querySelector('.modal_wrap')
const modal_background = document.querySelector('.modal_background')
$('#replayStart').on('click', function() {
	$('#replayStart').css("visibility", "hidden");


	$('.center-box2').empty()
	liveReplay()
})

//스킵하기
$('#liveBroadCastSkip').on('click', function() {
	$('#replayStart').css("visibility", "visible");
	skip()
})
//실시간 골드량 분석기
percent = 0
function liveGoldCheck(i) {
	let value1 = 0
	let minPerGold = timeline_list[0][i - 1]['minPerGold']
	let minPerGold1 = minPerGold.replace(/\"/gi, "")
	var champ12345678910Gold = minPerGold1.split(':');
	let champ12345Gold = champ12345678910Gold[0] // 아이디
	//	console.log(champ12345Gold)
	//	if (i = 1) {
	//
	//		value1 = champ12345Gold - 50
	//	}
	//	value1
	//	len = timeline_list[0].length
	//	var nowPercent = $(".goldProgress").css("width");

	$('.goldProgress').width(champ12345Gold + '%')

	$('#nowGold').html(minPerGold1)
	//	const barAnimation = setInterval(() => {

	//		$('.goldProgress').width(champ12345Gold + '%')
	//		if (i == len) {
	//
	//			clearInterval(barAnimation)
	//		} else if (nowPercent == champ12345Gold) {
	//			clearInterval(barAnimation)
	//
	//		} else if (nowPercent > champ12345Gold) {
	//
	//			percent--
	//
	//		} else {
	//			percent++
	//
	//		}
	//	}, 10)
}

///
teamList = []
function skip() {
	if (liveStart == 1) {
		clearInterval(playShow);

	}

	$('#one').hide()
	$('#two').hide()
	if (removeList.length != 0) {

		for (let i in removeList) {

			$("." + removeList[i]).remove()
		}

	}

	$('.center-box2').empty()
	$('.blueTeamSider').empty()
	$('.redTeamSider').empty()
	$('#one').empty()
	$('#two').empty()

	document.querySelector(".progress-bar").style.width = 100 + "%";
	$('#two').html('게임종료')
	$('.center-box2').prepend("<center><strong>==========Game Start==========</strong></center>")
	timelinelist = timeline_list[0]

	for (let i in timelinelist) {
		html2 = timelinelist[i].now_time
		//
		championName1 = timelinelist[i].championName
		championName1_kr = timelinelist[i].champion_name_kr
		team1 = timelinelist[i].team1
		border1 = ''
		//
		championName2 = timelinelist[i].victim_championName
		championName2_kr = timelinelist[i].victim_championName_kr
		team2 = timelinelist[i].team2
		border2 = ''
		//
		killStreakLength = timelinelist[i].killStreakLength
		//
		if (team1 == 100) {

			border1 = ' style="border:2px solid; border-color:blue; border-radius: 50%;"  '
		} else if (team1 == 200) {

			border1 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

		} else {

			border1 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

		}
		if (team2 == 100) {

			border2 = ' style="border:2px solid; border-color:blue; border-radius: 50%;" '

		} else if (team2 == 200) {

			border2 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

		} else {

			border2 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

		}
		if (championName1 == "FiddleSticks") {
			championName1 = "Fiddlesticks"
		}
		if (championName2 == "FiddleSticks") {
			championName2 = "Fiddlesticks"
		}


		img1 = "<img " + border1 + " width = 30 height = 30 onerror=this.src='/img/object/" + championName1 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName1 + ".png' >"
		img2 = "<img " + border2 + "width = 30 height = 30 onerror=this.src='/img/object/" + championName2 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName2 + ".png' >"

		nomal = `<div class = showImgDiv id = showImg${i} >
				 	<div class = showImgDivl> 
				 		<div class = showImgDivll>
				 			${html2} 
				 		</div>
				 		<div class = showImgDivlr> 
				 		 <span tooltip= ${championName1_kr}> <a href = "javascript:inputTimeToImg(\'${html2}\',\'${championName1}\')"> ${img1} </a></span><span style= "color : blue">	</span> -> <span tooltip=${championName2_kr}><a href = "javascript:inputTimeToImg(\'${html2}\',\'${championName2}\')">${img2}</a></span></div>
						</div>
					 <div class = showImgDivr>
					  <div class = showImgDivrC>`

		end = `</div></div> </div></div>`


		killnomal = `${killStreakLength} 연속 킬`
		ace = `${killStreakLength}	연속 킬 <span style="color:blue">Ace</span> `

		nice = `${killStreakLength}	연속 킬  <span style="color:red">Amazing</span></div>	`

		object = ""

		if (killStreakLength > 0 && killStreakLength < 3) {
			$('.center-box2').prepend(nomal + killnomal + end)
		} else if (killStreakLength >= 3 && killStreakLength < 5) {
			$('.center-box2').prepend(nomal + ace + end)
		} else if (killStreakLength >= 5 && killStreakLength <= 100) {
			$('.center-box2').prepend(nomal + nice + end)
		} else if (killStreakLength == 101) {
			object = "화학공학 D 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 102) {
			object = "화염 D 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 103) {
			object = "바람 D 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 104) {
			object = "마법공학D 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 105) {
			object = "대지 D 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 106) {
			object = "바다 D 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 107) {
			object = "장로 D 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 108) {
			object = "공허 유충 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 109) {
			object = "협곡의 전령 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else if (killStreakLength == 110) {
			object = "바론 처치"
			$('.center-box2').prepend(nomal + object + end)
		} else {
			$('.center-box2').prepend(nomal + end)

		}





	}
	$('.center-box2').prepend("<p></p>	")
	$('.center-box2').prepend("<center><strong>==========Game Set==========</strong></center>")



	dataTeam = { 'matchId': timelinelist[0].matchId }
	$.ajax({
		type: 'post',
		url: '/ai/teamList',
		data: dataTeam,
		success: function(res) {
			teamList = res
			blue = ''
			red = ''

			for (let i in res) {
				if (res[i].teamId == 100) {
					blue += inputImg(res[i].championName, res[i].champion_name_kr, 100)
				} else if (res[i].teamId == 200) {
					red += inputImg(res[i].championName, res[i].champion_name_kr, 200)
				}
			}
			$('.blueTeamSider').html(blue)
			$('.redTeamSider').html(red)
		}
	})

}


////////////////////////////////////////////////////////////////
function inputTimeToImg(nowTime, champName) {
	timelinelist = timeline_list[0]
	//	console.log("만드는중")
	for (let i in timelinelist) {
		//			console.log(timelinelist[i])
		if (timelinelist[i].now_time == nowTime && timelinelist[i].championName == champName) {
			//			console.log(nowTime)
			championName1 = timelinelist[i].championName
			championName1_kr = timelinelist[i].champion_name_kr
			team1 = timelinelist[i].team1
			border1 = ''
			//
			championName2 = timelinelist[i].victim_championName
			championName2_kr = timelinelist[i].victim_championName_kr
			team2 = timelinelist[i].team2
			border2 = ''
			//
			killStreakLength = timelinelist[i].killStreakLength
			if (team1 == 100) {

				border1 = ' style="border:2px solid; border-color:blue; border-radius: 50%;"  '
			} else if (team1 == 200) {

				border1 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

			} else {

				border1 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

			}
			if (team2 == 100) {

				border2 = ' style="border:2px solid; border-color:blue; border-radius: 50%;" '

			} else if (team2 == 200) {

				border2 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

			} else {

				border2 = ' style="border:2px solid; border-color:green; border-radius: 50%;	" '

			}
			if (championName1 == "FiddleSticks") {
				championName1 = "Fiddlesticks"
			}
			if (championName2 == "FiddleSticks") {
				championName2 = "Fiddlesticks"
			}

			img1 = "<img  " + border1 + " width = 30 height = 30 onerror=this.src='/img/object/" + championName1 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName1 + ".png' >"
			img2 = "<img " + border2 + "width = 30 height = 30 onerror=this.src='/img/object/" + championName2 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName2 + ".png' >"
			versus = '<img class = versus2 src="/img/versus2.png" >'
			html1 = img1 + versus + '<div style = "filter: brightness(50%)">' + img2 + '</div>'
			xmark = '<div class = xmark><img width=27 height=27 src="/img/xmark.png" alt="엑스버튼"></div>'

			x = timelinelist[i].x
			y = timelinelist[i].y

			x1 = x * 500
			y1 = y * 500
			$("#one").css({
				left: x1 - 5,
				top: 505 - y1
			})

			$(".two").css({
				left: x1 - 45,
				top: 490 - y1
			})
			$('#two').hide(0)
			$('.two').html(html1)
			$('.two').append(xmark)
			$('#two').show(150)

		}


	}
}
function inputImg(a, b, c) {

	listImg = ` <span tooltip= '${b}'>
					<a href = javascript:imgClick(${c},\'${a}\')>
						<img style='border:2px solid; border-color:black; border-radius: 50%;' width = 30 height = 30 src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${a}.png' >
					</a>
				</span>`
	return listImg

}
//////////////////////////////////////
function open() {
	//	console.log(timeline_list)
	let map = ''

	if (timeline_list[0][0] == '' || timeline_list[0][0] == null || timeline_list[0][0] == undefined || timeline_list[0][0] == 'undefined') {

		alert("해당게임은 관전이 불가능한 게임입니다.	")
		return false;
	}
	if (timeline_list[0][0].queueId == 450) {
		map = '<img class=mapimg src="/img/map2.png" id=tag>'

	} else {
		map = '<img class=mapimg src="/img/map.png" id=tag>'

	}

	plusDetail = `
					<div>
						<div class= "one" id="one"></div>
						<div class="two" id="two"></div>
					</div>
				`


	$('.ltop-box').html(map + plusDetail)

	$('#two').html('')
	$('#two').hide()

	x1 = 0
	y1 = 500
	$("#two").css({
		left: x1 - 133,
		top: 490 - y1
	})

	$("#one").css({
		left: x1 - 5,
		top: 505 - y1
	})
	$('.wrap').show();


	modal_wrap.classList.add('show-modal')
	modal_background.classList.add('show-modal')
}
////////////////////////////////
function close() {
	if (removeList.length != 0) {

		for (let i in removeList) {

			$("." + removeList[i]).remove()
		}

	}
	$('.redTeamSider').empty()
	$('.blueTeamSider').empty()
	$('#two').html('')
	$('.center-box2').empty()
	if (liveStart == 1) {
		clearInterval(playShow);

	}

	modal_wrap.classList.remove('show-modal');
	modal_background.classList.remove('show-modal');
}
////////////////////////////////////////////////////////////
function liveReplay() {
	liveStart = 1
	let x = 1000
	let i = 0 //올라가는값

	len = timeline_list[0].length

	playShow = setInterval(function() {
		if (i < len) {
			showInfoTimeLine(i)
			document.querySelector(".progress-bar").style.width = i / len * 100 + "%";
			i += 1;

			liveGoldCheck(i)



		} else if (i == len) {
			document.querySelector(".progress-bar").style.width = 100 + "%";
			$('#replayStart').css("visibility", "visible");
			skip()
			$('#two').html('게임종료')
		} else {

			clearInterval(playShow);
			$('#liveBroadCast').show()
			console.log("종료")
		}

	}, x);
}
/////////////////////////////////////////////////////////////
window.addEventListener('click', (e) => {
	//	console.log(e.target)

	e.target === modal_background ? close() : false
	if (e.target.className === 'btn btn-secondary dropdown-toggle show') {

		close()
	}

})
////////////////////////////////////////////////////////// 바 클릭
let id = ''
let a = ''
const progressBar = document.querySelector('.progress-container');
progressBar.addEventListener('click', (e) => {



	$('#replayStart').css("visibility", "visible");
	$('#one').show()
	$('#two').show()
	if (liveStart == 1) {
		skip()
	}
	if (removeList.length != 0) {
		skip()
		for (let i in removeList) {

			$("." + removeList[i]).remove()
		}

	}

	//오른쪽 포커스

	progressPercent = (e.offsetX / 500) //500은 그림 픽셀
	len = timeline_list[0].length
	document.querySelector(".progress-bar").style.width = progressPercent * 100 + "%";
	i = parseInt(len * progressPercent)
	liveGoldCheck(i)
	id = 'showImg' + i
	document.getElementById(id).scrollIntoView();

	$('#' + id).css("background-color", "rgba(100, 170, 253, 1)")
	a = 1

	let playBackGroundColor = setInterval(function() {
		if (a > 0) {
			a -= 0.05;
			$('#' + id).css("background-color", "rgba(100, 170, 253, " + a + ")")
		}
		else {	//색변경 완료
			clearInterval(playBackGroundColor);
			$('#' + id).css("background-color", "")
			console.log(a)
			//			a = 0
		}
	}, 50);

	//왼쪽 킬 표시 만들기
	championName1 = timelinelist[i].championName
	championName1_kr = timelinelist[i].champion_name_kr
	team1 = timelinelist[i].team1
	border1 = ''
	//
	championName2 = timelinelist[i].victim_championName
	championName2_kr = timelinelist[i].victim_championName_kr
	team2 = timelinelist[i].team2
	border2 = ''
	//
	killStreakLength = timelinelist[i].killStreakLength
	if (team1 == 100) {

		border1 = ' style="border:2px solid; border-color:blue; border-radius: 50%;"  '
	} else if (team1 == 200) {

		border1 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

	} else {

		border1 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

	}
	if (team2 == 100) {

		border2 = ' style="border:2px solid; border-color:blue; border-radius: 50%;" '

	} else if (team2 == 200) {

		border2 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

	} else {

		border2 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

	}
	if (championName1 == "FiddleSticks") {
		championName1 = "Fiddlesticks"
	}
	if (championName2 == "FiddleSticks") {
		championName2 = "Fiddlesticks"
	}

	img1 = "<img " + border1 + " width = 30 height = 30 onerror=this.src='/img/object/" + championName1 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName1 + ".png' >"
	img2 = "<img " + border2 + "width = 30 height = 30 onerror=this.src='/img/object/" + championName2 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName2 + ".png' >"
	versus = '<img class = versus2 src="/img/versus2.png" >'
	html1 = img1 + versus + img2
	xmark = '<div class = xmark><img width=27 height=27 src="/img/xmark.png" alt="엑스버튼"></div>'

	x = timelinelist[i].x
	y = timelinelist[i].y

	x1 = x * 500
	y1 = y * 500
	$("#one").css({
		left: x1 - 5,
		top: 505 - y1
	})

	$("#two").css({
		left: x1 - 45,
		top: 490 - y1
	})
	$('#two').hide(0)
	$('#two').html(html1)
	$('#two').append(xmark)
	$('#two').show(150)

});

///////////////////////////////////////사진 클릭시 실행되는 함수
removeList = []
function imgClick(team, champName) {
	$('#one').hide()
	$('#two').hide()
	if (removeList.length != 0) {

		for (let i in removeList) {

			$("." + removeList[i]).remove()
		}

	}
	//	console.log("사진클릭")
	$('.center-box2').empty()
	$('.center-box2').prepend("<center><strong>==========Game Start==========</strong></center>")

	for (let i in timelinelist) {

		if (timelinelist[i].championName == champName && timelinelist[i].team1 == team) {

			html2 = timelinelist[i].now_time
			//
			championName1 = timelinelist[i].championName
			championName1_kr = timelinelist[i].champion_name_kr
			team1 = timelinelist[i].team1
			border1 = ''
			//
			championName2 = timelinelist[i].victim_championName
			championName2_kr = timelinelist[i].victim_championName_kr
			team2 = timelinelist[i].team2
			border2 = ''
			//
			killStreakLength = timelinelist[i].killStreakLength

			if (team1 == 100) {

				border1 = ' style="border:2px solid; border-color:blue; border-radius: 50%;"  '
			} else if (team1 == 200) {

				border1 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

			} else {

				border1 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

			}
			if (team2 == 100) {

				border2 = ' style="border:2px solid; border-color:blue; border-radius: 50%;" '

			} else if (team2 == 200) {

				border2 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

			} else {

				border2 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

			}

			//			console.log("클릭중")
			if (championName1 == "FiddleSticks") {
				championName1 = "Fiddlesticks"
			}
			if (championName2 == "FiddleSticks") {
				championName2 = "Fiddlesticks"
			}

			img1 = "<img " + border1 + " width = 30 height = 30 onerror=this.src='/img/object/" + championName1 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName1 + ".png' >"
			img2 = "<img " + border2 + "width = 30 height = 30 onerror=this.src='/img/object/" + championName2 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName2 + ".png' >"

			nomal = `<div class = showImgDiv id = showImg${i} >
				 	<div class = showImgDivl> 
				 		<div class = showImgDivll>
				 			${html2} 
				 		</div>
				 		<div class = showImgDivlr> 
				 		 <span tooltip= ${championName1_kr}> <a href = "javascript:inputTimeToImg(\'${html2}\',\'${championName1}\')"> ${img1} </a></span><span style= "color : blue">	</span> -> <span tooltip=${championName2_kr}><a href = "javascript:inputTimeToImg(\'${html2}\',\'${championName2}\')">${img2}</a></span></div>
						</div>
					 <div class = showImgDivr>
					 <div class = showImgDivrC>`

			end = `</div></div> </div></div>`


			killnomal = `${killStreakLength} 연속 킬`
			ace = `${killStreakLength}	연속 킬 <span style="color:blue">Ace</span> `

			nice = `${killStreakLength}	연속 킬  <span style="color:red">Amazing</span></div>	`

			object = ""

			if (killStreakLength > 0 && killStreakLength < 3) {
				$('.center-box2').prepend(nomal + killnomal + end)
			} else if (killStreakLength >= 3 && killStreakLength < 5) {
				$('.center-box2').prepend(nomal + ace + end)
			} else if (killStreakLength >= 5 && killStreakLength <= 100) {
				$('.center-box2').prepend(nomal + nice + end)
			} else if (killStreakLength == 101) {
				object = "화학공학 D 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 102) {
				object = "화염 D 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 103) {
				object = "바람 D 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 104) {
				object = "마법공학D 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 105) {
				object = "대지 D 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 106) {
				object = "바다 D 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 107) {
				object = "장로 D 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 108) {
				object = "공허 유충 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 109) {
				object = "협곡의 전령 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else if (killStreakLength == 110) {
				object = "바론 처치"
				$('.center-box2').prepend(nomal + object + end)
			} else {
				$('.center-box2').prepend(nomal + end)

			}


			versus = '<img class = versus2 src="/img/versus2.png" >'
			html1 = img1 + versus + img2
			x = timelinelist[i].x
			y = timelinelist[i].y

			x1 = x * 500
			y1 = y * 500

			x2 = x1 - 45
			y2 = 490 - y1
			style = `style = "left: ${x2}px; top: ${y2}px; border: white;
							color: white;
							position: absolute;
//							background-color: rgba(0, 0, 0, 0.85);
							width: 100px;
							height": 35px;
							z-index": 6;"
			
					`
			html5 = '<div class = "two' + i + '"' + style + '>' + html1 + '</div>'
			$('.ltop-box').append(html5)
			removeList.push("two" + i)
		}
	}

	//	console.log(team, champName)
	$('.center-box2').prepend("<p></p>	")
	$('.center-box2').prepend("<center><strong>==========Game Set==========</strong></center>")
}


/////////////////////////////////라이브시스템 시작
let liveStart = 0
function showInfoTimeLine(i) {

	if (removeList.length != 0) {

		for (let i in removeList) {

			$("." + removeList[i]).remove()
		}

	}
	$('.redTeamSider').empty()
	$('.blueTeamSider').empty()
	$('#two').html('')

	img = ''
	//	console.log(i)
	timelinelist = timeline_list[0]
	//	html1 = img1 + ' ->' + img2


	html2 = timelinelist[i].now_time
	//
	championName1 = timelinelist[i].championName
	championName1_kr = timelinelist[i].champion_name_kr
	team1 = timelinelist[i].team1
	border1 = ''
	//
	championName2 = timelinelist[i].victim_championName
	championName2_kr = timelinelist[i].victim_championName_kr
	team2 = timelinelist[i].team2
	border2 = ''
	//
	killStreakLength = timelinelist[i].killStreakLength

	if (team1 == 100) {

		border1 = ' style="border:2px solid; border-color:blue; border-radius: 50%;"  '
	} else if (team1 == 200) {

		border1 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

	} else {

		border1 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

	}
	if (team2 == 100) {

		border2 = ' style="border:2px solid; border-color:blue; border-radius: 50%;" '

	} else if (team2 == 200) {

		border2 = ' style="border:2px solid; border-color:red; border-radius: 50%;" '

	} else {

		border2 = ' style="border:2px solid; border-color:green; border-radius: 50%;" '

	}
	if (championName1 == "FiddleSticks") {
		championName1 = "Fiddlesticks"
	}
	if (championName2 == "FiddleSticks") {
		championName2 = "Fiddlesticks"
	}

	img1 = "<img " + border1 + " width = 30 height = 30 onerror=this.src='/img/object/" + championName1 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName1 + ".png' >"
	img2 = "<img " + border2 + "width = 30 height = 30 onerror=this.src='/img/object/" + championName2 + ".png' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/" + championName2 + ".png' >"


	nomal = `<div class = showImgDiv id = showImg${i} >
				 	<div class = showImgDivl> 
				 		<div class = showImgDivll>
				 			${html2} 
				 		</div>
				 		<div class = showImgDivlr> 
				 		 <span tooltip= ${championName1_kr}> <a href = "javascript:inputTimeToImg(\'${html2}\',\'${championName1}\')"> ${img1} </a></span><span style= "color : blue">	</span> -> <span tooltip=${championName2_kr}><a href = "javascript:inputTimeToImg(\'${html2}\',\'${championName2}\')">${img2}</a></span></div>
						</div>
					 <div class = showImgDivr>
					 <div class = showImgDivrC>`

	end = `<div></div> </div></div>`


	killnomal = `${killStreakLength} 연속 킬`
	ace = `${killStreakLength}	연속 킬 <span style="color:blue">Ace</span> `

	nice = `${killStreakLength}	연속 킬  <span style="color:red">Amazing</span></div>	`

	object = ""

	if (killStreakLength > 0 && killStreakLength < 3) {
		$('.center-box2').prepend(nomal + killnomal + end)
	} else if (killStreakLength >= 3 && killStreakLength < 5) {
		$('.center-box2').prepend(nomal + ace + end)
	} else if (killStreakLength >= 5 && killStreakLength <= 100) {
		$('.center-box2').prepend(nomal + nice + end)
	} else if (killStreakLength == 101) {
		object = "화학공학 D 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 102) {
		object = "화염 D 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 103) {
		object = "바람 D 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 104) {
		object = "마법공학 D 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 105) {
		object = "대지 D 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 106) {
		object = "바다 D 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 107) {
		object = "장로 D 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 108) {
		object = "공허 유충 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 109) {
		object = "협곡의 전령 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else if (killStreakLength == 110) {
		object = "바론 처치"
		$('.center-box2').prepend(nomal + object + end)
	} else {
		$('.center-box2').prepend(nomal + end)

	}


	versus = '<img class = versus2 src="/img/versus2.png" >'
	html1 = img1 + versus + '<div style = "filter: brightness(50%)">' + img2 + '</div>'

	x = timelinelist[i].x
	y = timelinelist[i].y

	x1 = x * 500
	y1 = y * 500
	$("#one").css({
		left: x1 - 5,
		top: 505 - y1
	})

	$("#two").css({
		left: x1 - 45,
		top: 490 - y1
	})
	$('#two').hide()
	$('#two').html(html1)
	$('#two').show(20)
}


