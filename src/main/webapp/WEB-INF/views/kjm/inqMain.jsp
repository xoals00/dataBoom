
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- <!DOCTYPE html> -->
<html>
<head>
<meta charset="UTF-8">

<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<link href="/css/kjm/inqheader.css" rel="stylesheet" type="text/css">
<!--    css -->
<title>Insert title here</title>
</head>
<body>

	<div id="modal1" class="modal1-overlay">
		<div class="modal1-window">
			<div class="modal-close-area">X</div>
			<div class="inqnav">
				<div class="modal-back-img">
					<div class="BackColor">
						<div class="inq-nav-itemleft"></div>
						<input type="button" class="inq-nav-item" id="inqMain"
							value="문의내역"> <input type="button" class="inq-nav-item"
							id="eventMessage" value="안내사항"> <input type="button"
							class="inq-nav-item" id="sendinq" value="문의하기">
					</div>
				</div>

			</div>


			<div class="modal-content">
				<table class="table table-green table-hover" id="modal1_wrap">

					<tr class="inqlist">
						<th class="n_num" style="display: none;">번호</th>
						<th class="n_title">제목</th>
						<th class="n_date">날짜</th>
						<th class="status">상태</th>
						<th class="send_userId" style="display: none;">보낸사람
					<tr>
					<tbody id="inqbody">

					</tbody>
				</table>

			</div>
		</div>
	</div>









	<!-- 	js   -->





</body>
</html>