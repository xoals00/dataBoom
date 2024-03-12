///**
// * 
// */
//
//$('#sendToAi').on("click", function() {
//	console.log("ai탐색중..")
//	kda = $('#aiKda').val()
//	tier = $('#aiTier').val()
//	teamPosition = $('#aiteamPosition').val()
//	totalDamageDealtToChampions = $('#aitotalDamageDealtToChampions').val()
//	goldEarned = $('#aigoldEarned').val()
//
//	aMap = {
//		"tier": tier
//		, "teamPosition": teamPosition
//		, "kda": kda
//		, "totalDamageDealtToChampions": totalDamageDealtToChampions
//		, "totalDamageDealtToChampions": totalDamageDealtToChampions
//		, "goldEarned": goldEarned
//	}
//
//	$.ajax({
//		contentType: 'application/json',
//		type: 'post',
//
//		url: '/ai/dataToAi',
//		//		url : 'src/main/resources/static/py/jgh/aiTrollCheck.py',
//		data: JSON.stringify(aMap),
//		success: function(res) {
//			console.log(res)
//			str = `<center><h1><span>${res.result}</span></h1></center>`
//
//			$('#aiReult').html(str)
//		}
//
//	})
//
//
//})



window.addEventListener('click', function(e) {

	let userId = $('#userId').val()

	//	if(userId == 'admin'|| userId == 'ADMIN'){
	//		
	//		
	//
	//		
	//		
	//	}
	if (e.target.className == 'teamId') {
		console.log(e.target);
		console.log("현재 관리자 아이디로 챔피언 캐릭터 사진을 누르는중");
	}

});
