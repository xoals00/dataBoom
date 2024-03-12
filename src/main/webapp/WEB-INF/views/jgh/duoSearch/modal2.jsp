

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>



<div class="modal_background"></div>
<div class="modal_wrap">
	<div class="modal2">

		<%@include file="chatmodal.jsp"%>
		<div class="wrap">

			<div class="flagA">
				<div class="tab">
					<ul class="tabitems">	
							
					</ul>
				</div>

				<!--tabA start-->
				<div id="tabA" class="tabcontent" style="display: block;">

					[[[<span id="duoPositionM"></span>]]]유저를 찾는중....	..</br> <span id="userIdM"></span>님이
					듀오를 구하고 있습니다. </br> ==================================== </br> 원하는 티어 : <span
						id="tierM"></span> </br> ==================================== </br> 한줄메모 : <span
						id="memoM"></span></br> </br>

					<!--tabA end-->
				
				</div>


					<button id="duoParty" class="learn-more">듀오신청하기</button>
				<button id="duoPartyCancel" style="display: none;">취소하기</button>

			</div>
			</br> <span id="flagcollapse"></span> </br>


			<!--tabB end-->

		</div>
	</div>
</div>