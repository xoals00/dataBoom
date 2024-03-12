<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1>정보수정페이지</h1>
<h1>아직 작동 안합니다.</h1>
<form action = "/member/changeInfo" method="post">

<input type ="text" class = "ChangeInfo" name = "userName" id ="userName" placeholder = "이름" value = "${mlist.userName}">
<input type ="text" class = "ChangeInfo" name = "userId" id ="userId" placeholder = "아이디" value = "${userId}">
<input type ="text" class = "ChangeInfo" name = "userEmail" id ="userEmail" placeholder = "이메일" value = "${mlist.userEmail}">
<input type = "submit" value = "확인" id = "changePwBtn">
</form>
</body>
</html>