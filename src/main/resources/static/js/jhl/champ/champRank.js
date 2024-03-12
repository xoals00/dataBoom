

$(function() {
	// 초기 실행: 기본 포지션에 대한 데이터 로드
	$('.rankSearch span#Top').addClass('activeRank');
	var defaultPosition = 'Top';
	var defaultTier = 'emerald';
	champRank(defaultPosition, defaultTier);

	//	tierUpdate();
});


function tierSelect() {
	var selectedPosition = document.querySelector('.rankSearch span.activeRank').id;
	var selectedTier = document.getElementById("rankSelect").value;
	champRank(selectedPosition, selectedTier)

}
function champRank(position, tier) {
	var tier = document.getElementById("rankSelect").value;
	$.ajax({
		type: "post",
		url: "/champRank",
		data: { "teamPosition": position, "tier": tier },
		success: function(res) {

			let tableRows = '';

			for (let i = 0; i < res.length; i++) {
				tableRows += "<tr class='rTable'>";
				tableRows += "<td class='rData'><span class='champNum'>" + (i + 1) + "</span></td>";
				tableRows += "<td class ='rData'><div><div class = 'champs-sc'><div class ='champ-sc-img'><img width='45' height='45' src='https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/" + res[i].champion_name + ".png' class='champRankImg'></div><span class='rankChampName'>" + res[i].champion_name_kr + "</span></div></div></td>";
				tableRows += "<td class ='rData'><div class='rate_items'><span class= 'rate_vp'>" + res[i].win_rate + "<span class='rate_p'> % </span></span></div></td>";
				tableRows += "<td class ='rData'><div class='rate_items'><span class= 'rate_vp'>" + res[i].pick_rate + "<span class= 'rate_p'> % </span></span></div></td>";
				tableRows += "<td class='rData'><div class='rate_items'><span class='rate_vp'>" + res[i].ban_rate + "<span class='rate_p'> % </span></span></div></td>";

				tableRows += "</tr>";
			}


			$('.rTableBody').html(tableRows);
			//			console.log(res);
			//			console.log(a);

			modNum = $('#modNum').text()


						if (modNum == 0) {
//			
////							$('span').css("color", "#212529")
//							$('.ranklineBtn .activeRank').css("color","#8CB9FC")
							$('.rankSearch').css("background-image", "linear-gradient(rgb(255, 255, 255),rgb(42, 44, 51) 0%, rgb(34, 34, 34) 94%)")
//			
//			
						}

//						if (modNum == 0) {
//			
////							$('span').css("color", "#212529")
//			
//			
//						}

		}
	});

}

$('.rankSearch span').on('click', function() {
	$('.rankSearch span').removeClass('activeRank');
	$(this).addClass('activeRank');
	// 추가: 클릭한 포지션에 따라 데이터 갱신
	var selectedPosition = $(this).attr('id');
	var selectedTier = document.getElementById("rankSelect").value;
	champRank(selectedPosition, selectedTier);

});


$(document).on('click', '.rankLine>div', function() {
	//	var modnum = $('#modNum').text()
	//	console.log(modnum)


	$(this).addClass('ranklineBtn');
	$(this).siblings().removeClass('ranklineBtn');



//		if(modnum == 0){
	//		
	//		console.log(modnum)
//			$('.rankSearch').css("color","white")
	//		
	//		
//		}
	// else if(modnum == 1){
	//		
	//		console.log(modnum)
	//		
	//		console.log("들어왔어요~")		
	//		
	//		$('.rankSearch').css("background-image","linear-gradient(315deg, #D6E5FC 0%, #9DC4FD 74%)")
	//		$('#top').css("color","white")
	//		$('#jug').css("color","white")
	//		$('#mid').css("color","white")
	//		$('#adc').css("color","white")
	//		$('#sup').css("color","white")
	//		
	//	}




});
function alert1(){
	
	alert("개발중입니다.")
}

