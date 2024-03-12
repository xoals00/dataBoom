
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>결제담당자 페이지</title>
<!-- css들어갈자리  -->
<style>

  table {
    width:500px;
    border: 1px solid #444444;
    border-collapse: collapse;
  }
  tbody {
    border: 1px solid #444444;
  }

</style>
</head>
<body>

	<%@include file="../inc/header.jsp"%>

	[[결제담당자 및 관리자 출입가능.]] 결제 담당 총 리스트
	<div id = "paymentTable">

	</div>

	<script defer src="/js/admin/payment.js"></script>



</body>
</html>