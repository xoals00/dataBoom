
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>첫화면</title>
<!-- css들어갈자리  -->
<link rel="stylesheet" href="css/star/style2.css" />
<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>	
</head>

<body>

<div id="fly-in">  
<div><span>팀 이름 </span>DataBoom</div>
<div><span>조장</span>장기훈</div>
<div><span>조원 </span>김동근, 김진문</div>
<div><span>조원 </span>송태민, 정혜린, 김윤태</div>

<div><span>help us </span>김기찬</div>
<div><span>일보아카데미</span>차지헌</div>
<div><span>지금 </span> 바로!</div>
<div><span></span> 시작합니다</div>
</div>


<script type="text/javascript">


$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
    	console.log("gg")
       location.href = "/new"
   }
});
</script>


</body>

</html>