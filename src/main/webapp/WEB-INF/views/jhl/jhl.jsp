<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>초보자를 위한 DataBoom</title>

<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<!-- css들어갈자리  -->
<link href="/css/jhl/champImg.css" rel="stylesheet">
<link href="/css/jhl/champRank.css" rel="stylesheet">
<link href="/css/jgh/chartRiot.css" rel="stylesheet">

</head>

<body>
	<%@include file="../inc/header.jsp"%>
	
	<!-- 랭크 테이블  -->
	<%@include file="champRank.jsp"%>
	<%@include file="../inc/footer.jsp"%>

	<!-- js들어갈자리  -->
	<script defer src="js/jhl/champ/champSearch.js"></script>
	<script defer src="js/kdg/kdgDarkmod.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>
	

</body>

</html>