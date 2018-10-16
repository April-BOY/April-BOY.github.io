(function(){
  
  $(window).on('resize',function(){
    
    let json = [
      {
      	bac:"url(./img/slide_01_2000x410.jpg)",
      	img:"./img/slide_01_640x340.jpg"
      },
      {
      	bac:"url(./img/slide_02_2000x410.jpg)",
      	img:"./img/slide_02_640x340.jpg"
      },
      {
      	bac:"url(./img/slide_03_2000x410.jpg)",
      	img:"./img/slide_03_640x340.jpg"
      },
      {
      	bac:"url(./img/slide_04_2000x410.jpg)",
      	img:"./img/slide_04_640x340.jpg"
      }
    ];
    
    let width = $(window).width();
    let isMobile = true;
    if(width < 768){
      isMobile = true;
    }else{
      isMobile = false;
    }
    let html = template('sliderWrapper',{data:json,isMobile});
    $('#inner').html(html);
    
    /**
     * 动态生成小圆点
     */
    let indicators = template('indicatorsWrapper',{data:json,isMobile});
    $('.carousel-indicators').html(indicators);
    let $aLis = $('.carousel-indicators').find('li');
    $aLis.eq(0).toggleClass('active');
    
    
    /**
     * 焦点跟随
     */
    let num = 0;
    function spotFollow(){
      $aLis.removeClass('active');
      $aLis.eq(num).addClass('active');
    }
    
    let startX = 0;
    let endX = 0;
    let distanceX = 0;
    let isMove = false;
    
    $('#inner').on('touchstart',function(e){
      console.log(e)
    	startX = e.originalEvent.touches[0].clientX;
      $('#wjs-swiper').carousel('pause');
    });
    $('#inner').on('touchmove',function(e){
    	endX = e.originalEvent.touches[0].clientX;
    	isMove = true;
    });
    $('#inner').on('touchend',function(){
    	distanceX = endX - startX;
    	if(isMove){
    		if(distanceX > 0){
    			$('#inner').carousel('prev');
          num = ++num > json.length -1? 0:num;
    		}else if(distanceX < 0){
    			$('#inner').carousel('next');
          num = --num < 0 ? json.length - 1:num;
    		}
    		spotFollow();
        }
    	startX = 0;
    	endX = 0;
    	distanceX = 0;
    	isMove = false;
    	// $('#wjs-swiper').carousel({wrap:true});
    });
    
  }).trigger('resize');
  
  /**
   * 自动生成小圆点
   */
  
  
})();