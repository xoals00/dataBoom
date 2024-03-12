<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="modal5" class="modal5-overlay">
		<div class="modal5-window">
			<div class="modal-close-area">X</div>
			<div class="modal5-title">
				<h2>DataBoom</h2>
			</div>

			<div class="modal5-content">
				<table>
					<tr>
					<tr style="display: none;">
						<th>번호</th>
						<td id="Enum"></td>
					</tr>
					<tr>
						<th class="thead-title"><div class = "EtitleArea" style = "text-align : center;">제목</div></th>
						<td class="title"><div class = "EtitleArea" id="Etitle"></div></td>
					</tr>
					<tr class="trTime">
						<th class="thead"><div class = "SendTimeArea">보낸시간</div></th>
						<td class="datetime"><div class = "SendTimeArea2" id="Edatetime"></div></td>
					</tr>

					<tr>
						<th class="thead-message"><div class = "messageline" style = "text-align : center;">내용</div></th>
						<td class="message" id="Emessage"><div class = "messageline" id="Emessage"></div></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>