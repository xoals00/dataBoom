<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="modal4" class="modal4-overlay">
		<div class="modal4-window">
			<div class="modal-close-area">X</div>
			<div class="title">
				<h2>문의내역</h2>
				<h6>최근 6개월 동안 접수하신 1:1문의내역 및 답변 내용을 확인하실 수 있습니다.</h6>
			</div>

			<div class="modal4-content">
				<table>
					<tr>
					<tr style="display: none;">
						<th>번호</th>
						<td id="num"></td>
					</tr>
					<tr>
						<th class ="thead">등록일</th>
						<td class ="datetime" id="datetime"></td>
						<th class ="thead">처리상태</th>
						<td class ="sta" id="sta"></td>
					</tr>
					<tr>
						<th class ="thead-title">제목</th>
						<td class ="title" id="title"></td>
					</tr>

					<tr>
						<th class ="thead-message">내용</th>
						<td class="message" id="message"></td>
					</tr>
					<tr>
						<th class ="thead-answer">답변</th>
						<td class ="answer" id="answer"></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>