function champToolTip(c){
	
    var champOffset = $('#'+c).offset();
    var champTop = champOffset.top;
    var champLeft = champOffset.left;
    var champion_name = c.split("_")[1]
    var champtooltip = $('.tooltip-champ');
    
    data = {
		
		"champion_name" : champion_name
		
	}
	$.ajax({

		type: "POST",
		url: "/kdg/getKRname",
		data: data,
		success: function(res) {
			
			console.log(res.length)
			
			if(res.length == 1){

				$('.tooltip-champ').html(res)
				
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft
			        
			    });
			    	
		    } else if(res.length == 2){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 6
			        
			    });				
				
			} else if(res.length == 3){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 11
			        
			    });				
				
			} else if(res.length == 4){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 21
			        
			    });				
				
			} else if(res.length == 5){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 26
			        
			    });				
				
			} else if(res.length == 6){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 32
			        
			    });				
				
			} else if(res.length == 7){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 38
			        
			    });				
				
			} else if(res.length == 8){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 44
			        
			    });				
				
			} else if(res.length == 9){

				$('.tooltip-champ').html(res)
								
			    champtooltip.css({
			        'position': 'absolute',
			        'top': champTop - champtooltip.outerHeight() - 2,
			        'left': champLeft - 48
			        
			    });				
				
			}

		}

	})
}