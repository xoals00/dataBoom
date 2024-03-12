<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script defer src="/js/kjm/Note/inqAdmin.js"></script>
<link href="/css/kjm/eventMessage.css" rel="stylesheet" type="text/css">
</head>
<body>
<!-- <button id = "test">버튼</button> -->

<div id = "memberl">
</div>
<input type = "hidden" name = "send_userId" id = "send_userId" value = "${userId}">
<div class ="container1">
<div class ="container2">
<div class ="Title">Title<br></div>
<input type = "text" class="inTitle" name = "n_title" id = "n_title">
<div class ="Message">Message<br></div>
<textarea class = "messageArea" name = "n_message" id = "n_message" rows ="10" cols ="50"></textarea>
<br><br><br>
<button class = "sendBtn"id = "sendAll">발송</button><a href ="/admin/inq">취소</a>
</div>
 </div> 

</body>
</html>