tierListKor = ["아이언", "브론즈", "실버", "골드", "플래티넘", "에메랄드", "다이아몬드"]
tierListEg = ["iron", "bronze", "silver", "gold", "platinum", "emerald", "diamond"]


$(document).ready(function() {


	startMakeTable('platinum', 1)

})

function choice(a) {	

	if (a == 'TierDropDown') {

		$('#selectMenu').html(a)

	} else if (a == 'CoreItemDropDown') {

		$('#selectMenu').html(a)
	}

}

function choiceTier1(itemNum) {
	tier = choiceTier
	for (let i in tierListEg) {

		if (tierListEg[i] == tier) {

			tierCheck = tierListKor[i] // tierCheck : 한글이름

		}

	}

//	console.log(tierCheck)
//	console.log(itemNum)
	$('#selectTier').html(tierCheck)


	var tierCheck = $('#selectTier').text()
	str = "<img src='../img/tier/" + tier + ".png' style='width: 20px; height: 20px;'> " + tierCheck
	$('#TierDropDown').html(str)

	//	var tier = $('#tier_en').text();

	data = {

		"tier": tier,
		"itemNum": itemNum

	}
	$.ajax({

		type: "POST",
		url: "/kdg/itemInfo",
		data: data,
		success: function(res) {

			str = ""
			str += "<table class = 'coreItemList'>"
			str += "<tr class = 'tableMainTr'>"

			str += "<td></td></tr>"
			str += "<tr class = 'resultTr0'>"
			str += "<td class = 'small_td'>#</td>"
			str += "<td class = 'small_tiertd'>티어</td>"
			str += "<td class = 'long_rowtd2' colspan='2'>전설 아이템</td>"
			str += "<td>픽률</td>"
			str += "<td>승률</td>"
			str += "<td class = 'long_rowtd' colspan='5'>챔피언</td>"
			str += "<td class = 'none_td'></td>"
			str += "<td class = 'long_rowtd' colspan='5'>포지션</td>"
			str += "</tr>"

			str2 = ""
			for (let i = 0; i < res.length; i++) {
				str2 += "<tr class = 'resultTr" + ((i + 1) % 2) + "'>"
				str2 += "<td rowspan='2'>" + (i + 1) + "</td>"
				str2 += "<td rowspan='2'><img src='../img/tier/" + res[i].tier + ".png' style = 'width: 40px; height: 40px;'></td>"
				str2 += "<td class = 'itemImg_td' rowspan='2'><img id = '" + res[i].itemId + "' class='jb-title' src='https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/" + res[i].itemId + ".png' onmouseover='javascript:itemToolTip(this.id)'>"
				str2 += "<p class = 'jb-text'></p></td>"
				str2 += "<td class = 'itemName_td' rowspan='2'>" + res[i].name + "</td>"
				str2 += "<td rowspan='2'>" + (res[i].itemCnt / res[i].allItemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td rowspan='2'>" + (res[i].itemWinCnt / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				if (res[i].itemPickChamp1 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp1 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp1 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp2 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp2 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp2 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp3 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp3 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp3 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp4 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp4 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp4 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp5 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp5 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp5 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				str2 += "<td rowspan='2'>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line1 + "' class='jb-title-line' src='../img/" + res[i].line1 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line2 + "' class='jb-title-line' src='../img/" + res[i].line2 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line3 + "' class='jb-title-line' src='../img/" + res[i].line3 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line4 + "' class='jb-title-line' src='../img/" + res[i].line4 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line5 + "' class='jb-title-line' src='../img/" + res[i].line5 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "</tr>"
				str2 += "<tr class = 'resultTr" + ((i + 1) % 2) + "'>"
				str2 += "<td class = 'td_txt highest_rate'>" + (res[i].itemPickCnt1 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt2 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt3 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt4 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt5 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt highest_rate'>" + (res[i].lineCnt1 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt2 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt3 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt4 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt5 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "</tr>"
			}
			str3 = "</table>"

			$('.coreItemList_box').html(str + str2 + str3)
			modNum = $('#modNum').text();

			if (modNum == 0) {

				$('.tableMainTr').css("background-color", "#343a40")
				$('.tableMainTr').css("color", "white")

				$('.resultTr0').css("background-color", "#27282d")
				$('.resultTr0').css("color", "#999")

				$('.resultTr1').css("background-color", "#2a2c33")
				$('.resultTr1').css("color", "#999")

				$('body').css("background-color", "#222")

			} else if (modNum == 1) {

				$('.tableMainTr').css("background-color", "rgba(27, 65, 221, 0.58)")
				$('.tableMainTr').css("color", "black")

				$('.resultTr0').css("background-color", "rgb(120, 173, 252)")
				$('.resultTr0').css("color", "black")

				$('.resultTr1').css("background-color", "rgb(157, 196, 253)")
				$('.resultTr1').css("color", "black")

				$('body').css("background-color", "white")
			}

		}

	})

}

choiceTier = 'platinum'

function startMakeTable(tier, cnt) {

	choiceTier = tier
	choiceTier1(cnt)

}

function choiceCore(c) {

	console.log($('#selectTier').text())

	if (c == 'firstCore') {
		$('#selectCore').html("1코어 아이템")
	} else if (c == 'secondCore') {
		$('#selectCore').html("2코어 아이템")
	} else if (c == 'thirdCore') {
		$('#selectCore').html("3코어 아이템")
	}

	var core = $('#selectCore').text()
	$('#CoreItemDropDown').html(core)

	var tier = $('#tier_en').text();
	var tierKr = $('#selectTier').text()

	console.log(tier)
	console.log(tierKr)

	if ($('#selectCore').text() == "1코어 아이템") {
		var itemNum = 1;
	} else if ($('#selectCore').text() == "2코어 아이템") {
		var itemNum = 2;
	} else if ($('#selectCore').text() == "3코어 아이템") {
		var itemNum = 3;
	}
	data = {

		"tier": tier,
		"itemNum": itemNum

	}
	$.ajax({

		type: "POST",
		url: "/kdg/itemInfo",
		data: data,
		success: function(res) {

			str = ""
			str += "<table class = 'coreItemList'>"
			str += "<caption class = 'coreItemList_caption resultTr0''>전설 아이템을 3개 이상 구매한 유저들의 아이템 통계입니다!&ensp;</caption>"
			str += "<tr class = 'tableMainTr'><td colspan = '6' style = 'text-align: left;'>"
			str += "<div class='dropdown'>"
			str += "<button id='TierDropDown' class='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false' onclick='javascript:choice(this.id)'><img src='../img/tier/" + $('#tier_en').text() + ".png' style='width: 20px; height: 20px;'> " + $('#selectTier').text() + "</button>"
			str += "<ul class='dropdown-menu'><li><a id='iron' onclick='javascript:choiceTier(this.id)' class='dropdown-item'><img src='../img/tier/iron.png' style='width: 30px; height: 30px;'>아이언</a></li>"
			str += "<li><a id='bronze' onclick='javascript:choiceTier(this.id)' class='dropdown-item'><img src='../img/tier/bronze.png' style='width: 30px; height: 30px;'>브론즈</a></li>"
			str += "<li><a id='silver' onclick='javascript:choiceTier(this.id)' class='dropdown-item'><img src='../img/tier/silver.png' style='width: 30px; height: 30px;'>실버</a></li>"
			str += "<li><a id='gold' onclick='javascript:choiceTier(this.id)' class='dropdown-item'><img src='../img/tier/gold.png' style='width: 30px; height: 30px;'>골드</a></li>"
			str += "<li><a id='platinum' onclick='javascript:choiceTier(this.id)' class='dropdown-item'><img src='../img/tier/platinum.png' style='width: 30px; height: 30px;'>플래티넘</a></li>"
			str += "<li><a id='emerald' onclick='javascript:choiceTier(this.id)' class='dropdown-item'><img src='../img/tier/emerald.png' style='width: 30px; height: 30px;'>에메랄드</a></li>"
			str += "<li><a id='diamond' onclick='javascript:choiceTier(this.id)' class='dropdown-item'><img src='../img/tier/diamond.png' style='width: 30px; height: 30px;'>다이아몬드</a></li></ul>"
			str += "<button id='CoreItemDropDown' class='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false' onclick='javascript:choice(this.id)'>" + $('#selectCore').text() + "</button>"
			str += "<ul class='dropdown-menu'>"
			str += "<li id='dropdownLi'><a id='firstCore' onclick='javascript:choiceCore(this.id)' class='dropdown-item'>1코어 아이템</a></li>"
			str += "<li id='dropdownLi'><a id='secondCore' onclick='javascript:choiceCore(this.id)' class='dropdown-item'>2코어 아이템</a></li>"
			str += "<li id='dropdownLi'><a id='thirdCore' onclick='javascript:choiceCore(this.id)' class='dropdown-item'>3코어 아이템</a></li></ul></div>"
			str += "</td>"
			str += "<td colspan = '10' style = 'text-align: right;'>version : 14.01"
			str += "</td><td></td></tr>"
			str += "<tr class = 'resultTr0'>"
			str += "<td class = 'small_td'>#</td>"
			str += "<td class = 'small_tiertd'>티어</td>"
			str += "<td class = 'long_rowtd2' colspan='2'>전설 아이템</td>"
			str += "<td>픽률</td>"
			str += "<td>승률</td>"
			str += "<td class = 'long_rowtd' colspan='5'>챔피언</td>"
			str += "<td class = 'none_td'></td>"
			str += "<td class = 'long_rowtd' colspan='5'>포지션</td>"
			str += "</tr>"

			str2 = ""
			for (let i = 0; i < res.length; i++) {
				str2 += "<tr class = 'resultTr" + ((i + 1) % 2) + "'>"
				str2 += "<td rowspan='2'>" + (i + 1) + "</td>"
				str2 += "<td rowspan='2'><img src='../img/tier/" + res[i].tier + ".png' style = 'width: 40px; height: 40px;'></td>"
				str2 += "<td class = 'itemImg_td' rowspan='2'><img id = '" + res[i].itemId + "' class='jb-title' src='https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/" + res[i].itemId + ".png' onmouseover='javascript:itemToolTip(this.id)'>"
				str2 += "<p class = 'jb-text'></p></td>"
				str2 += "<td class = 'itemName_td' rowspan='2'>" + res[i].name + "</td>"
				str2 += "<td rowspan='2'>" + (res[i].itemCnt / res[i].allItemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td rowspan='2'>" + (res[i].itemWinCnt / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				if (res[i].itemPickChamp1 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp1 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp1 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp2 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp2 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp2 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp3 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp3 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp3 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp4 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp4 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp4 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				if (res[i].itemPickChamp5 != 'FiddleSticks') {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_" + res[i].itemPickChamp5 + "' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/" + res[i].itemPickChamp5 + ".png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				} else {
					str2 += "<td class = 'small_chtd' ><img id = '" + i + "_Fiddlesticks' class='jb-title-champ' src = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiddlesticks.png' onmouseover='javascript:champToolTip(this.id)'><p class='tooltiptext tooltip-champ'></p></td>"
				}
				str2 += "<td rowspan='2'>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line1 + "' class='jb-title-line' src='../img/" + res[i].line1 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line2 + "' class='jb-title-line' src='../img/" + res[i].line2 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line3 + "' class='jb-title-line' src='../img/" + res[i].line3 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line4 + "' class='jb-title-line' src='../img/" + res[i].line4 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "<td class = 'small_ltd'><img id = '" + i + "_" + res[i].line5 + "' class='jb-title-line' src='../img/" + res[i].line5 + ".png' onmouseover='javascript:lineToolTip(this.id)'><p class='tooltiptext tooltip-top'></p></td>"
				str2 += "</tr>"
				str2 += "<tr class = 'resultTr" + ((i + 1) % 2) + "'>"
				str2 += "<td class = 'td_txt highest_rate'>" + (res[i].itemPickCnt1 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt2 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt3 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt4 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].itemPickCnt5 / res[i].itemCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt highest_rate	'>" + (res[i].lineCnt1 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt2 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt3 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt4 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "<td class = 'td_txt'>" + (res[i].lineCnt5 / res[i].lineAllCnt * 100).toFixed(2) + "%</td>"
				str2 += "</tr>"
			}
			str3 = "</table>"

			$('.coreItemList_box').html(str + str2 + str3)
			modNum = $('#modNum').text();

			if (modNum == 0) {

				$('.tableMainTr').css("background-color", "#343a40")
				$('.tableMainTr').css("color", "white")

				$('.resultTr0').css("background-color", "#27282d")
				$('.resultTr0').css("color", "#999")

				$('.resultTr1').css("background-color", "#2a2c33")
				$('.resultTr1').css("color", "#999")

				$('body').css("background-color", "#222")

			} else if (modNum == 1) {

				$('.tableMainTr').css("background-color", "rgba(27, 65, 221, 0.58)")
				$('.tableMainTr').css("color", "black")

				$('.resultTr0').css("background-color", "rgb(120, 173, 252)")
				$('.resultTr0').css("color", "black")

				$('.resultTr1').css("background-color", "rgb(157, 196, 253)")
				$('.resultTr1').css("color", "black")

				$('body').css("background-color", "white")

			}

		}

	})

}

//장기훈  클릭시 사라지게 만듬 //
window.addEventListener("click", (e) => {


	$('.closeDownDrop').css("display", "none")

})
//마우스 가져다 대면  점점 보이게
downDropPoint = 0
window.addEventListener("mouseover", (e) => {



	if (e.target.className == 'dropDown-btn') {

		$('.closeDownDrop').css("display", "block")


	}
	else if (e.target.className != '') {


		$('.closeDownDrop').css("display", "none")
	}

})

