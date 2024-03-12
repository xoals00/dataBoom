<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="/css/common/findId.css" rel="stylesheet" type="text/css">
</head>
<body>
	<div class="navbars">
		<div class="navbarMain">
			<a href="/member/findIdT">아이디찾기</a>
		</div>
		<div class="navMenuDuo">
			<a href="/member/findPw">비밀번호찾기</a>
		</div>
	</div>
	<div class="container">
		<div class= "container3">
			<form class = "formArea" action="/member/changePw2" method="post">
				비밀번호변경<br> <input type="hidden" class="password"
					name="userId" id="userId" value="${userId}"> <input
					type="password" class="password" name="userPw" id="userPw"
					placeholder="새 비밀번호"><br> <input type="password"
					class="password" name="passwordcheck" id="passwordcheck"
					placeholder="새 비밀번호 확인"> <input class="submitBtn" type="submit" value="확인"
					id="changePwBtn">
			</form>
		</div>
	</div>

	<div class="navbars2">
		<div class="navbarMain">
			<a href="/">DataBoom</a>
		</div>
	</div>

</body>
</html>