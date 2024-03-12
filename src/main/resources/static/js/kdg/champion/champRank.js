$(document).ready(function() {
	
	i = 1
	
	setInterval(getChampRank, 5000)
	
	function getChampRank(){
		
		
	    $.ajax({
			

			type: "POST",
			url: "/kdg/champRank",
			success: function(res) {
				
				var modnum = $('#modNum').text()
			  
	  	  		if (i == 0) {

						str = "<p>"+(res[0][0].teamPosition).toUpperCase()+" Best Pick 3"
			  	    	$('.comm_title').html(str)

						firstChamp = "<img class = 'crown_img' src='../img/kdg/glory.png'><img id = 'myChamp' class = 'firstTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[0][0].champion_name+".png'>"
						$('.comm_firstChamp_img').html(firstChamp)
					
						secondChamp = "<img id = 'myChamp' class = 'secondTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[0][1].champion_name+".png'>"
						$('.comm_secondChamp_img').html(secondChamp)
					
						thirdChamp = "<img id = 'myChamp' class = 'thirdTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[0][2].champion_name+".png'>"
						$('.comm_thirdChamp_img').html(thirdChamp)		
					
						if (modnum == 1){
							$('.comm_graph_title > .comm_title > p').css("color","black")
						} else if(modnum == 0) {
							$('.comm_graph_title > .comm_title > p').css("color","white")
						}	
					
						i = 1;
		
				} else if (i == 1) {
						
					    str = "<p>"+(res[1][0].teamPosition).toUpperCase()+" Best Pick 3"
				  	    $('.comm_title').html(str)					
			
						firstChamp = "<img class = 'crown_img' src='../img/kdg/glory.png'><img id = 'myChamp' class = 'firstTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[1][0].champion_name+".png'>"
						$('.comm_firstChamp_img').html(firstChamp)
						
						secondChamp = "<img id = 'myChamp' class = 'secondTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[1][1].champion_name+".png'>"
						$('.comm_secondChamp_img').html(secondChamp)
						
						thirdChamp = "<img id = 'myChamp' class = 'thirdTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[1][2].champion_name+".png'>"
						$('.comm_thirdChamp_img').html(thirdChamp)	
								
						if (modnum == 1){
							$('.comm_graph_title > .comm_title > p').css("color","black")
						} else if(modnum == 0) {
							$('.comm_graph_title > .comm_title > p').css("color","white")
						}		
							
						i = 2;
		
				} else if (i == 2) {
						
					    str = "<p>"+(res[2][0].teamPosition).toUpperCase()+" Best Pick 3"
				  	    $('.comm_title').html(str)
			
						firstChamp = "<img class = 'crown_img' src='../img/kdg/glory.png'><img id = 'myChamp' class = 'firstTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[2][0].champion_name+".png'>"
						$('.comm_firstChamp_img').html(firstChamp)
						
						secondChamp = "<img id = 'myChamp' class = 'secondTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[2][1].champion_name+".png'>"
						$('.comm_secondChamp_img').html(secondChamp)
						
						thirdChamp = "<img id = 'myChamp' class = 'thirdTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[2][2].champion_name+".png'>"
						$('.comm_thirdChamp_img').html(thirdChamp)	
						
						if (modnum == 1){
							$('.comm_graph_title > .comm_title > p').css("color","black")
						} else if(modnum == 0) {
							$('.comm_graph_title > .comm_title > p').css("color","white")
						}						
						
						i = 3;
		
				} else if (i == 3) {
						
					    str = "<p>"+(res[3][0].teamPosition).toUpperCase()+" Best Pick 3"
				  	    $('.comm_title').html(str)
			
						firstChamp = "<img class = 'crown_img' src='../img/kdg/glory.png'><img id = 'myChamp' class = 'firstTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[3][0].champion_name+".png'>"
						$('.comm_firstChamp_img').html(firstChamp)
						
						secondChamp = "<img id = 'myChamp' class = 'secondTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[3][1].champion_name+".png'>"
						$('.comm_secondChamp_img').html(secondChamp)
						
						thirdChamp = "<img id = 'myChamp' class = 'thirdTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[3][2].champion_name+".png'>"
						$('.comm_thirdChamp_img').html(thirdChamp)
						
						if (modnum == 1){
							$('.comm_graph_title > .comm_title > p').css("color","black")
						} else if(modnum == 0) {
							$('.comm_graph_title > .comm_title > p').css("color","white")
						}						
						
						i = 4;
					
				} else if (i == 4) {
						
					    str = "<p>"+(res[4][0].teamPosition).toUpperCase()+" Best Pick 3"
					    $('.comm_title').html(str)	
					    		
						firstChamp = "<img class = 'crown_img' src='../img/kdg/glory.png'><img id = 'myChamp' class = 'firstTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[4][0].champion_name+".png'>"
						$('.comm_firstChamp_img').html(firstChamp)
			
						secondChamp = "<img id = 'myChamp' class = 'secondTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[4][1].champion_name+".png'>"
						$('.comm_secondChamp_img').html(secondChamp)
						
						thirdChamp = "<img id = 'myChamp' class = 'thirdTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[4][2].champion_name+".png'>"
						$('.comm_thirdChamp_img').html(thirdChamp)
						
						if (modnum == 1){
							$('.comm_graph_title > .comm_title > p').css("color","black")
						} else if(modnum == 0) {
							$('.comm_graph_title > .comm_title > p').css("color","white")
						}						
						
						i = 0;
			
				}
		  
		  }
		
		
		
		})

	}
})

	

$(document).ready(function() {
		
	    $.ajax({

			  type: "POST",
			  url: "/kdg/champRankStart",
			  success: function(res) {
				  
				  str = "<p>"+(res[0].teamPosition).toUpperCase()+" Best Pick 3"
				  $('.comm_title').html(str)
		
				  firstChamp = "<img class = 'crown_img' src='../img/kdg/glory.png'><img id = 'myChamp' class = 'firstTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[0].champion_name+".png'>"
				  $('.comm_firstChamp_img').html(firstChamp)
					
				  secondChamp = "<img id = 'myChamp' class = 'secondTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[1].champion_name+".png'>"
				  $('.comm_secondChamp_img').html(secondChamp)
					
				  thirdChamp = "<img id = 'myChamp' class = 'thirdTierChamp' src = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+res[2].champion_name+".png'>"
				  $('.comm_thirdChamp_img').html(thirdChamp)	
			  
			  }

		
		})
})
