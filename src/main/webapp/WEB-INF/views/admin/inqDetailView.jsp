<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link href="/css/kjm/modal_main.css" rel="stylesheet" type="text/css">	
</head>
<body>
	<div id="imodal" class="imodal-overlay">
		<div class="imodal-window">
			<div class="modal-close-area">X</div>
			<div class="title"></div>

			<div class="modal-content" id="imodal-body">
				<table>
					<tr>
						<th>제목</th>
						<td>${dInq.n_title}</td>
					</tr>
					<tr>
						<th>보낸사람</th>
						<td>${dInq.send_userId}</td>
					</tr>
					<tr>
						<th>날짜</th>
						<td>${dInq.n_date}</td>
					</tr>

					<tr>
						<th>내용</th>
						<td>${dInq.n_message}</td>
					</tr>
				</table>
				<button class="answer" id="answer">답변하기</button>
				<a href ="/admin/inq">돌아가기</a>
			</div>
		</div>
	</div>

	<%@include file="inqAnswer.jsp"%>
	<script defer src="/js/kjm/Note/NoteModal.js"></script>
	<script defer src="/js/kjm/Note/inqAdmin.js"></script>
</body>
</html>