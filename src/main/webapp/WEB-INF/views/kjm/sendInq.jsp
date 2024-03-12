<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<script defer src="/js/kjm/Note/Note.js"></script>
<body>

	<div id="modal3" class="modal3-overlay">
		<div class="modal3-window">
			<div class="modal-close-area">X</div>
			<div class="modal3-content">
				<input type="hidden" name="send_userId" id="send_userId" value ="${userId }">
				<input type="hidden" name="recv_userId" id="recv_userId" value ="admin">
				<input type="hidden" name="status" id="status" value ="1">
				<div class = "titleArea">
				Title<br><input type="text" class ="inqTitle" name="n_title" id="n_title"><br>
				</div>
				<div class = "messageArea">
				Message<br></div>
				<textarea rows="10" cols="80" class ="inqMessage" name="n_message" id="n_message" placeholder="관련없는 내용일시 삭제됩니다."></textarea><br>
				
				<button type="button" class="inq-nav-item" id="inqMain3">돌아가기</button>
				<button type="button" class="inq-nav-item" id="mailsend">보내기</button>
				

			</div>
		</div>
	</div>

</body>
</html>