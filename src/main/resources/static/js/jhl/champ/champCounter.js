/**
 * 
 */

//function champCounter() {
//	laneChampCounterList = ['TOP', 'jug', 'mid', 'adc', 'sup']
//	for (let i in laneChampCounterList) {
//
//		console.log(laneChampCounterList[i] + "업데이트 시작")
//
//		$.ajax({
//			type: "post",
//			url: "/champCounter",
//			data: { "teamPosition": laneChampCounterList[i] },
//			success: function(res) {
//				//				console.log("<<  뜨면 업데이트 성공")
//			}
//		})
//	}
//}
// 모달 열기 함수

//카카오페이지 모달이랑 이름이 똑같아서 변경필요해서 일단 이름 뒤에 1
//붙여서 바까놓을께 -장기훈
//function openModal1(championName) {
//	var modalContainer = $('#myModal');
//	Counterchamplist(championName);
//
//	// 이미지 및 챔피언 이름을 모달 내부에 추가
//	//		modalContent.empty().append($('<div>').append();
//
//	// 모달 열기
//	modalContainer.css('display', 'flex');
//}
//
//// 모달 닫기 함수
//function closeModal1() {
//	$('#myModal').css('display', 'none');
//}
//
//// 모달 외부를 클릭하면 모달이 닫히도록 함
//$(document).on('click', function(event) {
//	var modal = $('#myModal');
//	if (event.target == modal[0]) {
//		closeModal();
//	}
//});



//function Counterchamplist(championName) {
//	$.ajax({
//		type: "post",
//		url: "/CounterchampList",
//		data: { "championName": championName },
//		success: function(res) {
//			console.log(championName)
//			var modalContent = $('.modal-content');
//			for (let i in res) {
//				let champName = res[i].championName
//				let champ_kr_name = res[i].champ_kr_name
//				let enemyName = res[i].enemy_championName
//				let enemy_kr_name = res[i].enemy_championName_kr
//
//
//				modalContent.append($('<div>').text(champName));
//				modalContent.append($('<div>').text(champ_kr_name));
//				modalContent.append($('<div>').text(enemyName));
//				modalContent.append($('<div>').text(enemy_kr_name));
//
//			}
//		},
//		error: function(xhr, status, error) {
//			console.error("AJAX 오류:", status, error);
//		}
//	})
//}