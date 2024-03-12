<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- 	김진문 -->

<link href="/css/kjm/modal_main.css" rel="stylesheet" type="text/css">
<script defer src="js/kjm/Note/inqMain.js"></script>
<%@include file="../kjm/inqMain.jsp"%>
<%@include file="../kjm/sendInq.jsp"%>
<%@include file="../kjm/eventMessage.jsp"%>
<%@include file="../kjm/inqdetail.jsp"%>
<%@include file="../kjm/eventDetail.jsp"%>
<!-- 김진문 -->
<!-- 장기훈 -->

<!-- 장기훈 -->
<footer class="footer-bottom">
	<p></p>
	<c:if test="${userId != null}">
		<a href=# class="comprehensive-item" id="GoGoGo">고객센터</a>

		<hr>
	</c:if>
	<a href="/test">큰화면으로 보기 [누르시오]</a>
	<div class="movieStart">
		<span><font-size :2> 장기훈 김동근 김진문 김윤태 송태민 정혜린</font-size></span>

	</div>

	<div>인천일보아카데미</div>
	<div>인천광역시 미추홀구 매소홀로488번길 6-32 태승빌딩 5층</div>
	<div>copyright DataBoom</div>



	<!-- 			<a href = "/py/main">aitest페이지가기</a> -->

	<!-- 			<a href = "/testboard">송태민 새로운 보드</a> -->
	<script defer src="/js/ai/main.js"></script>
</footer>




