$(document).ready(function() {
	$("#analysisBtn").click(function() {
				
		$('#lineCheck').empty()
		
		$('#champList').empty()
		
		$('#line').hide()
		let cn = $('#searchChamp').val()
		data = {
			"searchChamp" : cn
		}
		
		$.ajax({
			type : "POST",
			url : "/kdg/search",
			data : data,
			success : function(res) {
				
				str1 = "<ul id = 'champListUl'>"
				str2 = ''
					for (let i = 0; i < res.length; i++){
						if(res[i].champion_name != 'Smolder'){
							str2 += "<li  id = 'champListLi'><img id='"+res[i].champion_name+"' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[i].champion_name+".png'"
							str2 += "width='44' height='44' alt='"+res[i].champion_name+"' class='bg-image' onclick='javascript:submit(this.id)'>"
							str2 +=	"<span class = 'champList_span'>"+res[i].champion_name_kr+"</span></li>"
							}
						}
				str3 = "</ul>"
				
				$('#champList').html(str1 + str2 + str3)
			}
		})
	});
});

function line(a){
	
	$('#lineCheck').html(a)
	
	$('#champList').empty()
	data = {
		"line" : a
		}
		
 	$.ajax({
		type : "POST",
		url : "/kdg/position",
		data : data,
		success : function(res) {	
			
			str1 = "<ul id = 'champListUl'>"
			str2 = ''
					for (let i = 0; i < res.length; i++){
						if(res[i].champion_name != 'Smolder'){
							str2 += "<li  id = 'champListLi'><img id='"+res[i].champion_name+"' src='https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[i].champion_name+".png'"
							str2 += "width='44' height='44' alt='"+res[i].champion_name+"' class='bg-image' onclick='javascript:submit(this.id)'>"
							str2 +=	"<span class = 'champList_span'>"+res[i].champion_name_kr+"</span></li>"
							}
						}
			str3="</ul>"
					
			$('#champList').html(str1 + str2 + str3)
		}
	})
}