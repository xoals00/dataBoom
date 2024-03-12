<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<script defer src="/js/jhl/champ/champRank.js"></script>
<script defer src="/js/jhl/champ/champUpdate.js"></script>
<script defer src="/js/jhl/champ/champCounter.js"></script>
<script defer src="/js/jhl/champ/champChart.js"></script>
</head>
<body>
	<!-- 	<h3>카운터 챔피언 제대로 구하려면 100만개 데이터 필요...</h3> -->
	<p id="modNum" style="visibility: hidden; position: absolute;">1</p>

	<div class="rankContainer">
		<!-- 		<div class="aside left"></div> -->
		<div class="contentsRank">
			<div class="contentsItemsChamp">

				<!-- 				장기훈 -->



				<div class=championGraphContainer>
					<div class=championGraphContent>
						<div class="myImg"></div>
						<div class='box-left'>
							<div class="box-leftSelect"></div>
							<div style="max-width: 230px;" id="myChart1"></div>
						</div>
						<!-- 						<div class='box-center'> -->
						<!-- 													<div style="max-width: 300px" id="myChart2"></div> -->
						<!-- 						</div> -->
						<div class='box-right'>
							<div class='box-right-contents'>
								<div class='topPick10'>픽률TOP10</div>
								<div class='box-right2'></div>
							</div>
							<div style="max-width: 1000px" id="myChart3"></div>
						</div>
						<!-- 						<div class='box-side'></div> -->
					</div>
				</div>


				<!-- 장기훈 -->

				<!-- 				<div class="rankbanner">배너?</div> -->

				<div class="rankUpdateBtn">
					<input type="button" id="jhlRankUpdateBtn" onclick="champUpdate()"
						value="챔피언업데이트버튼" />
				</div>


				<div class="widthTest"></div>
				<!-- 				장기훈 -->
				<div class="contetnsCheckA">
					<div class=contentsCheckM>
						<div class=contentsCheckS>

							<div class="contentsDetailL"></div>
							<div class="GoPart">
								<ul class="menu2">
									<li class="sampletest"><a href="/jhl" class='Summoner-sc'>소환사의협곡</a></li>
									<!-- 									<li class="sampletest"><a href="javascript:reload(},0)">전체</a></li> -->
									<!-- 									<li class="sampletest"><a href="javascript:reload(},0)">전체</a></li> -->
								</ul>
									
									<li class="sampletest"><a href="#" class='Summoner-sc'>칼바람 나락</a></li>
									<!-- 									<li class="sampletest"><a href="javascript:reload(},0)">전체</a></li> -->
									<!-- 									<li class="sampletest"><a href="javascript:reload(},0)">전체</a></li> -->
								</ul>
							</div>

							<div class="contentsDetailR"></div>
						</div>
					</div>





					<!-- 				장기훈 -->
				</div>
				<div class="contentChampRank">
					<%@include file="champImg.jsp"%>
					<div class="contentsItem LineRank">
						<div class="sc-champTier">
							<span class="sc-rk-title">챔피언 랭킹</span>
							<div class="sc-champTieritems">
								<select id="rankSelect" onchange="tierSelect()">
									<option value="bronze" id="bronze">Bronze+
									<option value="silver" id="silver">Silver+
									<option value="gold" id="gold">Gold+
									<option value="platinum" id=platinum>Platinum+
									<option value="emerald" id="emerald" selected="selected">Emerald+







									
									<option value="diamond" id="diamond">Diamond+
								</select> <select id="rankSelectLanguage">
									<option value="KR" id="KR">KR
								</select>
							</div>
						</div>

						<div class="rankTableBox">
							<div class="rankLine">
								<div class="rankSearch ranklineBtn">
									<span id="Top" class="rankLineSelect"
										onclick="champRank('Top')"><img
										src="/img/jhl/positionImg/Position_Plat-Top.png">탑</span>
								</div>
								<div class="rankSearch">
									<span id="jug" class="rankLineSelect"
										onclick="champRank('jug')"><img
										src="/img/jhl/positionImg/Position_Plat-Jungle.png">정글</span>
								</div>
								<div class="rankSearch">
									<span id="mid" class="rankLineSelect"
										onclick="champRank('mid')"><img
										src="/img/jhl/positionImg/Position_Plat-Mid.png">미들</span>
								</div>
								<div class="rankSearch">
									<span id="adc" class="rankLineSelect"
										onclick="champRank('adc')"><img
										src="/img/jhl/positionImg/Position_Plat-Bot.png">바텀</span>
								</div>
								<div class="rankSearch">
									<span id="sup" class="rankLineSelect"
										onclick="champRank('sup')"><img
										src="/img/jhl/positionImg/Position_Plat-Support.png">서폿</span>
								</div>

							</div>
							<div class="lineRank">
								<div class="rankItems">
									<table class="rankTable">
										<colgroup>
											<col width="13%">
											<col>
											<col width="20%">
											<col width="20%">
											<col width="20%">

										</colgroup>
										<thead>
											<tr class="tableColumns">
												<th class="th-rtable"><div class='sc-rth'>
														<span>랭킹</span>
													</div></th>
												<th class="th-rtable"><div class='sc-rth'>
														<span>챔피언</span>
													</div></th>
												<th class="th-rtable"><div class='sc-rth'>
														<span>승률</span>
													</div></th>
												<th class="th-rtable"><div class='sc-rth'>
														<span>픽률</span>
													</div></th>
												<th class="th-rtable"><div class='sc-rth'>
														<span>밴률</span>
													</div></th>
											</tr>
										</thead>
										<tbody class="rTableBody">
											<tr class="rTable">
												<td class="rData"></td>
												<td class="rData"></td>
												<td class="rData"></td>
												<td class="rData"></td>

											</tr>
										</tbody>
									</table>
								</div>
							</div>



						</div>
					</div>

				</div>
			</div>
		</div>
		<!-- 		<div class="aside right"></div> -->
	</div>
</body>


</html>