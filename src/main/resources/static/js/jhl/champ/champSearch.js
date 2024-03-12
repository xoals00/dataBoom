/**
 * 
 */
$(function() {
//	$('.Summoner-sc').addClass('sn-ck')
//	$(this).removeClass('sn-ck')
//
	champImgAll();
});


$(document).on('click', '.selectChampline>div', function() {
	$(this).addClass('lineClick');
	$(this).siblings().removeClass('lineClick');
});

$('#champSearch').on('keyup', function() {
	let searchChamp = $('#champSearch').val();

	$.ajax({
		type: "post",
		url: "/champSearch",
		data: { "champSearch": searchChamp },
		success: function(res) {

			var champContainer = $('.champs');

			champContainer.empty();

			for (let i = 0; i < res.length; i++) {
				let champName = res[i].champion_name_kr
				let Name = res[i].champion_name
				var imgSrc = 'https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/' + res[i].champion_name + '.png';

				// 이미지 엘리먼트 동적으로 생성
				var imgElement = $('<img>').addClass('championImg').attr('src', imgSrc).attr('id', Name);


				// 생성된 이미지 엘리먼트를 컨테이너에 추가
				champContainer.append($('<div>').addClass('champImgItem').append($('<span>').addClass('tooltiptext tooltip-top').append(champName))
					.append($('<div>').addClass('cimgs').append(imgElement)).append($('<span>').addClass('champName').append(res[i].champion_name_kr)));

			}

//			modNum = $('#modNum').text()
//
//			if (modNum == 0) {
//
//				$('span').css("color", "#ffffff")
//				$('.tooltiptext').css("background-color", "#2a2c33")
//				$('.tooltiptext').css("border", "1px solid #2a2c33")
//
//			}
//
//			else if (modNum == 1) {
//
//				$('span').css("color", "#212529")
//				$('.tooltiptext').css("background-color", "#8CB9FC")
//				$('.tooltiptext').css("border", "1px solid rgb(120, 173, 252)")
//			}

		}
	});
});

function champImgAll() {
	$.ajax({
		type: "get",
		url: "/champListAll",
		dataType: "json",
		success: function(res) {
			var champContainer = $('.champs');

			// 이전에 추가된 이미지 엘리먼트들을 초기화
			champContainer.empty();

			for (let i = 0; i < res.length; i++) {

				let champName = res[i].champion_name_kr
				let Name = res[i].champion_name
				var imgSrc = 'https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/' + res[i].champion_name + '.png';

				// 이미지 엘리먼트 동적으로 생성
				var imgElement = $('<img>').addClass('championImg').attr('src', imgSrc).attr('id', Name);

				// 생성된 이미지 엘리먼트를 컨테이너에 추가
				champContainer.append($('<div>').addClass('champImgItem').append($('<span>').addClass('tooltiptext tooltip-top').append(champName))
					.append($('<div>').addClass('cimgs').append(imgElement)).append($('<span>').addClass('champName').append(res[i].champion_name_kr)));

			}




			modNum = $('#modNum').text()

//			if (modNum == 0) {
//
////				$('span').css("color", "#ffffff")
//				$('.tooltiptext').css("background-color", "#2a2c33")
//				$('.tooltiptext').css("border", "1px solid #2a2c33")
//
//			}
//			else if (modNum == 1) {
//
////				$('span').css("color", "#212529")
//				$('.tooltiptext').css("background-color", "#8CB9FC")
//				$('.tooltiptext').css("color", "white")
//				$('.tooltiptext').css("border", "1px solid rgb(120, 173, 252)")
//			}


		}
	});

}
$('#champAll').on('click', function() {
	champImgAll();

});


function champLine(lineSelect) {
	$.ajax({
		type: "post",
		url: "/champLineSelect",
		data: { "line": lineSelect },
		success: function(res) {

			var champContainer = $('.champs');

			champContainer.empty();

			for (let i = 0; i < res.length; i++) {
				let champName = res[i].champion_name_kr
				let Name = res[i].champion_name
				var imgSrc = 'https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/' + res[i].champion_name + '.png';
				var imgElement = $('<img>')
					.addClass('championImg')
					.attr('src', imgSrc)
					.attr('id', Name)
				//                    .click(function () {
				//                        openModal(championName); // 클릭 시 모달 열기
				//                    });
				// 챔피언 이미지 아이템 생성
				var champImgItem = $('<div>').addClass('champImgItem')
					.append($('<span>').addClass('tooltiptext tooltip-top').append(champName))
					.append($('<div>').addClass('cimgs').append(imgElement))
					.append($('<span>').addClass('champName').append(res[i].champion_name_kr));

				// 생성한 아이템을 컨테이너에 추가
				champContainer.append(champImgItem);
			}




			modNum = $('#modNum').text()
//
			if (modNum == 0) {
//
//				$('span').css("color", "#ffffff")
				$('.tooltiptext').css("background-color", "#2a2c33")
				$('.tooltiptext').css("border", "1px solid #2a2c33")
//
//
			}
			else if (modNum == 1) {
//
//				$('span').css("color", "#212529")
				$('.tooltiptext').css("background-color", "#8CB9FC")
				$('.tooltiptext').css("color", "white")
				$('.tooltiptext').css("border", "1px solid rgb(120, 173, 252)")
			}



		}
	});
}




