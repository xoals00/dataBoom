<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<div class = "container" style = "width: 300px; height: 200px; margin : 20% 0% 20% 42%;">
	<form action="/member/ChangeInfo" method="post" >
						 <input type="hidden" id="userId"
							name="userId" value="${userId}"><br> <label for="password">패스워드</label> <input
							type="password" id="userPw" name="userPw"> <input
							type="submit" value="비밀번호확인" style ="display : none; ">
					</form>
</div>
</body>
</html>