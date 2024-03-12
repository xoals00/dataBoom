$(window).scroll(  
    function(){  

        if($(window).scrollTop() > 422){  
  
            $('.sideBannerR').addClass("fix");  

        }else{  
            $('.sideBannerR').removeClass("fix");  
 
        }  
    }  
); 
 
$(window).scroll(  
    function(){  

        if($(window).scrollTop() > 422){  

            $('.sideBannerL').addClass("fix");  
 
        }else{  
            $('.sideBannerL').removeClass("fix");  

        }  
    }  
);  
