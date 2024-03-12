function lineToolTip(b){
	
    var lineOffset = $('#'+b).offset();
    var lineTop = lineOffset.top;
    var lineLeft = lineOffset.left;
    
    var linetooltip = $('.tooltiptext');
    
	if(b.split("_")[1] == 'TOP'){
		$('.tooltip-top').html("탑")
			
	    linetooltip.css({
	        'position': 'absolute',
	        'top': lineTop - linetooltip.outerHeight() - 2,
	        'left': lineLeft
	    });
	    	
	} else if(b.split("_")[1] == 'JUG'){
		$('.tooltip-top').html("정글")
		
	    linetooltip.css({
	        'position': 'absolute',
	        'top': lineTop - linetooltip.outerHeight() - 2,
	        'left': lineLeft - 6.5
	    });
	    
	} else if(b.split("_")[1] == 'MID'){
		$('.tooltip-top').html("미드")
		
	    linetooltip.css({
	        'position': 'absolute',
	        'top': lineTop - linetooltip.outerHeight() - 2,
	        'left': lineLeft - 6.5
	    });
	    
	} else if(b.split("_")[1] == 'ADC'){
		$('.tooltip-top').html("원딜")	
		
	    linetooltip.css({
	        'position': 'absolute',
	        'top': lineTop - linetooltip.outerHeight() - 2,
	        'left': lineLeft - 6.5
	    });
	    
	} else if(b.split("_")[1] == 'SUP'){
		$('.tooltip-top').html("서폿")	
				
	    linetooltip.css({
	        'position': 'absolute',
	        'top': lineTop - linetooltip.outerHeight() - 2,
	        'left': lineLeft - 6.5
	    });
	    
	}

}