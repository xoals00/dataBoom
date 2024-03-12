
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>인사담당자 페이지</title>
<!-- css들어갈자리  -->
<link href="/css/admin/hrdCss.css" rel="stylesheet">
</head>
<body>

	<%@include file="../inc/header.jsp"%>
	<center>
		<h1>[[인사담당관 출입가능.]]</h1>
	</center>
	<div class="memberC">

		<div class="memberCR"></div>
		<div class="memberCC">
			<div id="memberTable"></div>
		</div>
		<div class = "memberCL">
		</div>
	</div>




	<script defer src="/js/admin/hrd.js"></script>





</body>
</html>