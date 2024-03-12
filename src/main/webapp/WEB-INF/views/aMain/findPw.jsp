<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="/css/common/findId.css" rel="stylesheet" type="text/css">

</head>
<body>

	<script defer src="/js/aCommon/findPw.js"></script>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


	<div class="navbars">
		<div class="navbarMain">
			<a href="/member/findIdT">아이디찾기</a>
		</div>
		<div class="navMenuDuo">
			<a href="/member/findPw">비밀번호찾기</a>
		</div>
	</div>

	<div class="container">
		<div class="container2">
			<div class="div_email">
				<form action="/member/findPw" method="post" id="findPw"
					onsubmit="return confirmNumber();">
					<label for="r_pn2" class="label_rd">본인확인 이메일로 인증</label>
					<div class="box_inn_sub">
						<p class="dsc">본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을 수 있습니다.</p><br>

						<label for="userId" class="label_txt">아이디</label> <input
							type="text" id="userId" class="userId" name="userId"
							maxlength="40" class="input_txt"><br>

<!-- 						<div id="mail_input" name="mail_input"> -->
							<label for="userEmail" class="label_txt">이메일</label> <input
								type="text" class="mail" name="userEmail" id="userEmail"
								placeholder="">
							<button type="button" id="sendBtn" name="sendBtn"
								onclick="sendNumber()" disabled="disabled">인증번호</button>
<!-- 						</div> -->
						<br> <label class = "chkArea" for="email" id="mailTxt">이메일을 입력해주세요</label>
						<!-- id = mail 바꾸지 말것 -->

						<br>
						<div id="mail_number" name="mail_number" style="display: none">
							<input type="text" name="number" id="number"
								placeholder="인증번호 입력">
							<button type="button" name="confirmBtn" id="confirmBtn"
								onclick="confirmNumber()">이메일 인증</button>
						</div>
						<br> <input type="text" id="Confirm" name="Confirm"
							style="display: none" value="">
					</div>

					<input type="submit" class = "submitBtn" value="비밀번호찾기" id="findBtn">
				</form>
			</div>
		</div>
	</div>

	<div class="navbars2">
		<div class="navbarMain">
			<a href="/">DataBoom</a>
		</div>
	</div>
</body>
</html>