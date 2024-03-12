<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- champ choice js 들어갈곳 -->
<script defer src="../js/kdg/champion/champChoice.js"></script>
<!-- champ list js 들어갈곳 -->
<script defer src="../js/kdg/champion/champList.js"></script>
<!-- champ rank js 들어갈곳 -->
<script defer src="../js/kdg/champion/champRank.js"></script>
<!-- champ rank js 들어갈곳 -->
<script defer src="../js/kdg/champion/champToolTip.js"></script>
<!-- kdg darkmod js 들어갈 곳 -->
<script defer src="../js/kdg/kdgDarkmod.js"></script>
<!-- GoogleChart js 들어갈 곳 -->
<script defer src="../js/kdg/item/itemGoogleChart.js" /></script>
<!-- itemInfo js 들어갈 곳 -->
<script defer src="../js/kdg/item/itemInfo.js" /></script>
<!-- itemToolTip js 들어갈 곳 -->
<script defer src="../js/kdg/item/itemToolTip.js" /></script>
<!-- lineToolTip js 들어갈 곳 -->
<script defer src="../js/kdg/lineToolTip.js" /></script>
<!-- banner js 들어갈 곳 -->
<script defer src="../js/kdg/kdgBanner.js"></script>
<!-- itemBuild js 들어갈 곳 -->
<script defer src="../js/kdg/item/itemBuild.js" /></script>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<!-- <script src="/static/js/bootstrap.bundle.js"></script> -->
<link rel="stylesheet" href="../css/kdg/kdg.css" />



</head>
<body>
	<!-- header jsp -->
	<%@include file="../inc/header.jsp"%>
	
	<!-- modal body jsp -->
	<%@include file="../kdg/modalBody.jsp"%>
	
	<!-- kdg body jsp -->
	<%@include file="../kdg/kdgBody.jsp"%>

	<!-- footer jsp -->
	<%@include file="../inc/footer.jsp"%>

</body>


</html>