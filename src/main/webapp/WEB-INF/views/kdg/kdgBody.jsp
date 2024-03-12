<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<meta charset="UTF-8">    
<title>아이템 분석</title>

<!-- 숨겨놓은 p tag 모음 -->
<p id="name" style="visibility: hidden; position: absolute;"></p>
<div class = "champs" style="visibility: hidden; position: absolute;">
	<p id="myChampName" style="visibility: hidden; position: absolute;"></p>
	<p id="enemyChampName" style="visibility: hidden; position: absolute;"></p>
	<p id="lineCheck" style="visibility: hidden; position: absolute;"></p>
	<p id="tierCheck" style="visibility: hidden; position: absolute;"></p>
</div>
<p id="selectMenu" style="visibility: hidden; position: absolute;"></p>	
<p id="tier_en" style="visibility: hidden; position: absolute;">platinum</p>
<p id="tier_en_Modal" style="visibility: hidden; position: absolute;">platinum</p>
<p id="selectTier" style="visibility: hidden; position: absolute;">플래티넘</p>
<p id="selectTierModal" style="visibility: hidden; position: absolute;">플래티넘</p>
<p id="selectCore" style="visibility: hidden; position: absolute;">1코어 아이템</p>
<p id="modNum" style="visibility: hidden; position: absolute;">1</p>
<p id="graph_line" style="visibility: hidden; position: absolute;">top</p>
<p id="hide_champList" style="visibility: hidden; position: absolute;">O</p>

<!-- 페이지 가운데로 맞추기 위해서 다크모드 헤더로 이동했습니다.(header.jsp , newMain.css) -->



<c:if test="${userId != null}">
	<div class="comm_left_sideBanner">
		<div class="sideBannerL">
		  <a data-bs-toggle="modal" href="#exampleModalToggle" onclick='javascript:test()'><img class = "bannerImg" src="../img/kdg/kdgBanner.jpg"></a>
		  <span class="txt-label banner_span_txt">
		    <a id = "analysisBtn" class="btn btn-primary banner_to_modalBtn" data-bs-toggle="modal" href="#exampleModalToggle" role="button" style = "width: 150px; margin-left: 28.3%;" onclick='javascript:test()'>get Item Build</a>
		  </span>
		</div>
	</div>
	<div class="comm_right_sideBanner">
		<div class="sideBannerR">
		  <a data-bs-toggle="modal" href="#exampleModalToggle" onclick='javascript:test()'><img class = "bannerImg" src="../img/kdg/kdgBanner.jpg"></a>
		  <span class="txt-label banner_span_txt">
		    <a id = "analysisBtn" class="btn btn-primary banner_to_modalBtn" data-bs-toggle="modal" href="#exampleModalToggle" role="button" style = "width: 150px; margin-left: 28.3%;" onclick='javascript:test()'>get Item Build</a>
		  </span>
		</div>
	</div>
</c:if>
<c:if test="${userId == null}">
	<div class="comm_left_sideBanner">
		<div class="sideBannerL">
		  <a onclick='javascript:nologin'><img class = "bannerImg" src="../img/kdg/kdgBanner.jpg"></a>
		  <span class="txt-label banner_span_txt">
		    <a id = "analysisBtn" class="btn btn-primary banner_to_modalBtn" role="button" style = "width: 150px; margin-left: 28.3%;" onclick='javascript:nologin()'>get Item Build</a>
		  </span>
		</div>
	</div>
	<div class="comm_right_sideBanner">
		<div class="sideBannerR">
		  <a onclick='javascript:nologin()'><img class = "bannerImg" src="../img/kdg/kdgBanner.jpg"></a>
		  <span class="txt-label banner_span_txt">
		    <a id = "analysisBtn" class="btn btn-primary banner_to_modalBtn" role="button" style = "width: 150px; margin-left: 28.3%;" onclick='javascript:nologin()'>get Item Build</a>
		  </span>
		</div>
	</div>
</c:if>
<div class = "rankContainer">
<div class = "contentsRank">

<div class = "contentsItemsChamp">
<div class ="itemList_container">
<div class ="comm_contents">
<div class="comm_graph_content">

<div class = "comm_graph_title">

	<div class = "comm_title">
	</div>
	
	<div class = "graph_title">
		<div class = "graph_title1">
			<p> 라인별 TOP5 Items
		</div>
		<div class = "graph_line">
			<div id = "lineDropdown">
				<div class='dropdown1'>
					<button id='lineDropdown_btn' class='btn btn-secondary dropdown-toggle line-select' type='button' data-bs-toggle='dropdown' aria-expanded='false'>라인 선택</button>
					<ul class='dropdown-menu'>
						<li>
							<a id='top' onclick='javascript:choiceLineGraph(this.id)' class='dropdown-item'>
							<img src='../img/top.png' style='width: 20px; height: 20px;'> 탑</a>
						</li>
						<li>
							<a id='jug' onclick='javascript:choiceLineGraph(this.id)' class='dropdown-item'>
							<img src='../img/jug.png' style='width: 20px; height: 20px;'> 정글</a>
						</li>
						<li>
							<a id='mid' onclick='javascript:choiceLineGraph(this.id)' class='dropdown-item'>
							<img src='../img/mid.png' style='width: 20px; height: 20px;'> 미드</a>
						</li>
						<li>
							<a id='adc' onclick='javascript:choiceLineGraph(this.id)' class='dropdown-item'>
							<img src='../img/adc.png' style='width: 20px; height: 20px;'> 원딜</a>
						</li>
						<li>
							<a id='sup' onclick='javascript:choiceLineGraph(this.id)' class='dropdown-item'>
							<img src='../img/sup.png' style='width: 20px; height: 20px;'> 서폿</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class = "graph_title2">
			<p> 상위 5개 아이템,&nbsp;<br>전체 티어 기준입니다.
		</div>
	</div>
</div>
<div class = "comm_champ_line">
	<p class = "champ_line"></p>
</div>
<div class = "comm_graph_box">

	<div class = "comm_box">
	
		<div class = "comm_firstChamp">
			<div class = "comm_firstChamp_imgbox">
				<div class = "comm_firstChamp_img"></div>
			</div>
		</div>
		
		<div class = "comm_secondChamp">
			<div class = "comm_secondChamp_imgbox">
				<div class = "comm_secondChamp_img"></div>
			</div>
		</div>
		
		<div class = "comm_thirdChamp">
			<div class = "comm_thirdChamp_imgbox">
				<div class = "comm_thirdChamp_img"></div>			
			</div>
		</div>
		
	</div>
	
	<div class = "graph_box">
		<div id = "chart"></div>
	</div>


</div>
<br>
<br>
</div>

	<div class = contetnsCheckA>
		<div class = contentsCheckM>
			<div class = contentsCheckS>
				 	
				  <div class = "contentsDetailL">
					
				  </div>
				  <div class="GoPart">
				   <ul class="menu2" >
				
				    <li class = "sampletest">
				    <div class="dropDown">
				   
				    <button class="dropDown-btn" 	>전체티어</button>
				     <div class = "closeDownDrop">
				  	  <div class="subMenu">
				           <div><a name = "tierClose" href="javascript:startMakeTable('iron',1)"><img src="../img/tier/iron.png" style="width: 40px; height: 40px;">아이언</a>
				         </div>  
				        <div> <a name = "tierClose" href="javascript:startMakeTable('bronze',1)"><img src="../img/tier/bronze.png" style="width: 40px; height: 40px;">브론즈</a>  </div>  
				         <div>  <a name = "tierClose" href="javascript:startMakeTable('silver',1)"><img src="../img/tier/silver.png" style="width: 40px; height: 40px;">실버</a>  </div>  
				         <div>  <a name = "tierClose" href="javascript:startMakeTable('gold',1)"><img src="../img/tier/gold.png" style="width: 40px; height: 40px;">골드</a>  </div>  
				         <div>  <a name = "tierClose" href="javascript:startMakeTable('platinum',1)"><img src="../img/tier/PLATINUM.png" style="width: 40px; height: 40px;">플래티넘</a>  </div>  
				         <div>  <a name = "tierClose" href="javascript:startMakeTable('emerald',1)"><img src="../img/tier/emerald.png" style="width: 40px; height: 40px;">에메랄드</a>  </div>  
				         <div>  <a name = "tierClose" href="javascript:startMakeTable('diamond',1)"><img src="../img/tier/diamond.png" style="width: 40px; height: 40px;">다이아몬드</a>  </div>  
				       </div>
				    </div>
				 	</div>   
				    
				    </li>
					
				    <li class = "sampletest"><a href="javascript:choiceTier1(1)">[1]코어</a></li>
					<li class="sampletest"><a href="javascript:choiceTier1(2)">[2]코어</a></li>
					<li class="sampletest"><a href="javascript:choiceTier1(3)">[3]코어</a></li>
					
				    <li class = "sampletest1"></li>
				    <li class = "sampletest2">version : 14.01	</li>
				    </ul>
				  </div>
				  	
				  <div class = "contentsDetailR">
				
				  </div> 
			</div>
		</div>
		</div>
		<div style = "height: 5px;"></div>
		
<div class="coreItemList_box" style=" color: white; width: 1100px; height: 1549px;">

</div>
</div>
<div class="comm_right_sideBanner"></div>
</div>
<div class = "moveContainerR"></div>
</div></div></div>