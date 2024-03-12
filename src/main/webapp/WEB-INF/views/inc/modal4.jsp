

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<script type="text/javascript"
	src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>
<div id="paymentModal" class="paymentModal">
	<div class="payment-modal-content">
		<div class="page-header"></div>
		<div class="containerPay">
			<div class="row">
				<div class="col-sm-12">
					<div class="row">
						<div class="col-up"></div>
						<div class="col-down">


							<div class=col-downl>
								<select id=totalMoney>

									<option value="1100">1,100원</option>
									<option value="2200">2,200원</option>
									<option value="5500">5,500원</option>
									<option value="11000">11,000원</option>
									<option value="55000">55,000원</option>

								</select>
							</div>


							<div class=col-downr>
								<button id="payNow" class="button-3d">결제하기</button>
							</div>



						</div>
						<div class="col-downdown" >
						<button class="button-3d" style = "width : 250px"  onClick="closeModal();">결제취소</button>
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</div>
</div>
