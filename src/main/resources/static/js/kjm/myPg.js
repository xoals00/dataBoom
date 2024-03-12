$('#myPgCpw2').hide()
$('#changeName2').hide()
$('#mbottom2').hide()

$('#myPgCpw').on("click", function() {
	//	console.log("실행")
	$('#myPgCpw').hide()
	$('#mbottom').hide()
	$('#myPgCpw2').show()
	$('#mbottom2').show()
	let changetxt = document.getElementById('ctxt');
	changetxt.innerHTML = '<div>비밀번호를 입력해주세요</div>'
	//	let changetxt4 = document.getElementById('current-pw');
	//	changetxt4.innerHTML = '<input type = "password" name ="userPw" id="currentPw">'

//	let changetxt6 = document.getElementById('mbottom');
//	changetxt6.innerHTML =
//		`<div class="agree-to-receive2">
//							<div class="agree-to-receivetop" >새 비밀번호</div>
//							<div class="agree-to-receivebot">
//								<div class="agree-to-receivebotl">
//									<input type = "password" class="inputArea" id="newPw" oninput="passwordCheck()">
//									<span class = "pwConfirm" id="pwConfirm" style="font-size : 14px;">비밀번호를 입력해주세요</span>
//								</div>
//							</div>
//						</div>
//						<div class="agree-to-receive3">
//							<div class="agree-to-receivetop" >새 비밀번호 확인</div>
//							<div class="agree-to-receivebot">
//								<div class="agree-to-receivebotl">
//									<input type = "password" class="inputArea" name ="userPw" id="newPwTest" oninput="passwordCheck()">
//									
//								</div>
//							</div>
//						</div>`

})

function passwordCheck() {
	if ($('#newPw').val() == $('#newPwTest').val()) {
		$('#pwConfirm').text('비밀번호 일치').css('color', 'green')
		let button = document.querySelector('#myPgCpw2');
		button.disabled = false;
	} else if (!$('#newPw').val() || !$('#newPwTest').val()) {
		$('#pwConfirm').text('비밀번호를 입력해주세요')
	} else {
		$('#pwConfirm').text('비밀번호 불일치').css('color', 'red')
	}
}

$('#myPgCpw2').on("click", function() {
	myPgCpw();
})
function myPgCpw() {
	let userId = $('#userId').val()
	let userPw = $('#newPw').val()



	data = {
		'userId': userId,
		'userPw': userPw

	}
	console.log("test");

	$.ajax({

		type: 'post',
		url: '/member/changePw',
		data: data,
		success: function(res) {
			console.log(res)

			if (res == 1) {
				alert("비밀번호 변경 성공.")
				$('#myPgCpw2').hide()
				$('#mbottom2').hide()
				$('#myPgCpw').show()
				$('#mbottom').show()


			} else {
				alert("변경 실패")

			}

		}
	})


}


$('#changeName').on("click", function() {
	$('#changeName').hide()
	//	$('#changeIdArea').hide()
	$('#changeName2').show()
	//	$('#userName').show()
	let changeArea = document.getElementById('changeIdArea');
	changeArea.innerHTML = '<input type = "text" class = "inputArea" name = "userName" id = "userName">'
	//		'<span id="checkName">이름을 입력해주세요</span>'
})

//$('#userName').on("keyup", function() {
//	namecheck()
//
//	let userName = $('#userName').val()
//	//	let checkName = $('#checkName').val()
//	let str = ''
//	let str2 = ''
//	function namecheck() {
//		if (!userName.length) {
//			str = "이름을 입력해주세요."
//			$('#changeName2').prop('disabled', true);
//			$('#checkName').html(str);
//			return;
//		} else if (!userName.length < 11) {
//			str2 = "10글자까지 입력 가능입니다. "
//			$('#checkName').html(str2);
//			$('#changeName2').prop('disabled', true);
//		} else {
//			$('#changeName2').prop('disabled', false);
//		}
//
//	}
//})

$('#changeName2').on("click", function() {
	infoChange();
})
function infoChange() {
	let userId = $('#userId').val()
	let userName = $('#userName').val()
	let changeArea = document.getElementById('changeIdArea');



	data = {
		'userId': userId,
		'userName': userName

	}
	console.log("test");

	$.ajax({

		type: 'post',
		url: '/member/changeInfo',
		data: data,
		success: function(res) {
			console.log(res)

			if (res == 1) {
				alert("수정완료!")
				$('#changeName2').hide()
				$('#changeName').show()
				changeArea.innerHTML = `<div class="pline2-1" id="changeIdArea">${data.userName}</div>`




			} else {
				alert("실패")

			}

		}
	})


}