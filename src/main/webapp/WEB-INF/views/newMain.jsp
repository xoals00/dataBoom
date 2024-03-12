<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DataBoom Hello!</title>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<link href="/css/new/new.css" rel="stylesheet" type="text/css">
<link href="/css/new/bar.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="css/style.css">



</head>

<body>
<p id="modNum" style="visibility: hidden; position: absolute;">1</p>
	<div class="main">



		<%@include file="inc/mainHeader.jsp"%>

			
		<%@include file="aMain/mainDetail.jsp"%>


		<%@include file="inc/footer.jsp"%>


	</div>

<script defer src="../js/kdg/kdgDarkmod.js"></script>
	<!-- js들어갈자리  -->
	<script defer src="js/star/style.js"></script>
	<script defer src="js/new/slide.js"></script>
	<script defer src="js/new/bar.js"></script>
	<script defer src="js/aCommon/common.js"></script>
<!-- 	<script defer src="js/new/comprehensive.js"></script> -->


</body>
</html>