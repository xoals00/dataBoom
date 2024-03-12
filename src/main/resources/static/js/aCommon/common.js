$('#memberjoin').on("click", function() {

	location.href = "/member/join"

})

$('#membermain').on("click", function() {

	location.href = "/new"

})
$('#memberlogin').on("click", function() {

	location.href = "/member/login"

})

$('#memberfindId').on("click", function() {

	location.href = "/member/findIdT"

})

$('#memberfindPw').on("click", function() {

	location.href = "/member/findPw"

})
//Splitting()
//$('.movieStart').on("click", function() {
//	console.log("무브시작")
//	div = document.createElement('div')
//	div.id = 'fly-in';
//
//	div.append()
//	$(".movieStart").append(div)
//})


//엔터키를 눌렀을때 실행
function GotoSearch() {
	if (window.event.keyCode == 13) {
		console.log("누름")
		let gameName = $('#search-home').val();
		if (gameName.length < 1) {
			alert("빈칸을 작성해 주세요")
			return false
		}

		var result = gameName.search('#');
		if (result == -1) {
			tagLine = "KR1"
			location.href = '/stm/' + gameName + "/" + tagLine
		} else {

			var gameId = gameName.split('#');
			let gameName1 = gameId[0] // 아이디
			let tagLine = gameId[1] // 태그
			location.href = '/stm/' + gameName1 + "/" + tagLine
		}
	}

}

$(document).ready(function() {

	




})



