function allItemTT(a){
	
	var itemId = a.split("_")[0]
	
	data = {
		"itemId" : itemId
	}
	$.ajax({
	type : "POST",
	url : "/kdg/allItemTT",
	data : data,
	success : function(res) {
		
		list = ['공격력', '주문력', '방어력', '마법', '스킬', '이동', '기본', '물리', '체력', '마나', '치명타', '생명력', '공격', '방어구', '강인함']
		
		var cnt = 0;
		 		
		item_name = "<span class = 'item_name_tt-tm'>"+res[0].itemName+"<span><br>"
		str = ""
		if(res[0].comment != ''){
			str += res[0].comment+"<br><br>"
		} else {
			str += "<br>"
		}
		for(let i = 0; i < list.length; i++){
			if(res[0].info1 != 'None' && (((res[0].info1).split(' '))[0]) == list[i]){
				cnt += 1
			}
			if(res[0].info2 != 'None' && (((res[0].info2).split(' '))[0]) == list[i]){
				cnt += 1
			}
			if(res[0].info3 != 'None' && (((res[0].info3).split(' '))[0]) == list[i]){
				cnt += 1
			}
			if(res[0].info4 != 'None' && (((res[0].info4).split(' '))[0]) == list[i]){
				cnt += 1
			}
		}
		
		for(let j = 1; j < cnt+1; j++){
			if(j == 1){
				str += res[0].info1+"<br>"
			}
			if(j == 2){
				str += res[0].info2+"<br>"
			}
			if(j == 3){
				str += res[0].info3+"<br>"
			}
			if(j == 4){
				str += res[0].info4+"<br>"
			}
		}
		if(res[0].info1 != 'None'){
			
			str += "<br>"
			
		}
		if (cnt == 1){
			if(res[0].info2 != 'None'){
				str += res[0].info2+"<br>"
			}
			if(res[0].info3 != 'None'){
				str += res[0].info3+"<br>"
			}
			if(res[0].info4 != 'None'){
				str += res[0].info4+"<br>"
			}
			if(res[0].info5 != 'None'){
				str += res[0].info5+"<br>"
			}
			if(res[0].info6 != 'None'){
				str += res[0].info6+"<br>"
			}
			if(res[0].info7 != 'None'){
				str += res[0].info7+"<br>"
			}
			if(res[0].info8 != 'None'){
				str += res[0].info8+"<br>"
			}
			if(res[0].info9 != 'None'){
				str += res[0].info9+"<br>"
			}	
		} else if(cnt == 2){
			if(res[0].info3 != 'None'){
				str += res[0].info3+"<br>"
			}
			if(res[0].info4 != 'None'){
				str += res[0].info4+"<br>"
			}
			if(res[0].info5 != 'None'){
				str += res[0].info5+"<br>"
			}
			if(res[0].info6 != 'None'){
				str += res[0].info6+"<br>"
			}
			if(res[0].info7 != 'None'){
				str += res[0].info7+"<br>"
			}
			if(res[0].info8 != 'None'){
				str += res[0].info8+"<br>"
			}
			if(res[0].info9 != 'None'){
				str += res[0].info9+"<br>"
			}			
		} else if(cnt == 3){
			if(res[0].info4 != 'None'){
				str += res[0].info4+"<br>"
			}
			if(res[0].info5 != 'None'){
				str += res[0].info5+"<br>"
			}
			if(res[0].info6 != 'None'){
				str += res[0].info6+"<br>"
			}
			if(res[0].info7 != 'None'){
				str += res[0].info7+"<br>"
			}
			if(res[0].info8 != 'None'){
				str += res[0].info8+"<br>"
			}
			if(res[0].info9 != 'None'){
				str += res[0].info9+"<br>"
			}			
		} else if(cnt == 4){
			if(res[0].info5 != 'None'){
				str += res[0].info5+"<br>"
			}
			if(res[0].info6 != 'None'){
				str += res[0].info6+"<br>"
			}
			if(res[0].info7 != 'None'){
				str += res[0].info7+"<br>"
			}
			if(res[0].info8 != 'None'){
				str += res[0].info8+"<br>"
			}
			if(res[0].info9 != 'None'){
				str += res[0].info9+"<br>"
			}			
		}
		
		price = "<br><span class = 'price_tt-tm'>가격 : "+ res[0].totalGold+"G ("+res[0].sellGold+")</span>"
		
		$('.jb-text-tm').html(item_name);
		$('.jb-text-tm').append(str);
		$('.jb-text-tm').append(price);
		
	    var imgOffset = $('#'+a).offset();
	    var imgTop = imgOffset.top;
	    var imgleft = imgOffset.left;
	    
	    var tooltip = $('.jb-text-tm');
	    
	    tooltip.css({
			'z-index' : "20",
	        'position': 'absolute',
	        'top': imgTop - tooltip.outerHeight() - 591, // 툴팁의 높이만큼 위로 이동하여 이미지 위에 배치
	        'left': imgleft - 110,
	    });
		
		}
	})
}