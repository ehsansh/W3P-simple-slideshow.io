/*jshint strict:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, unused:true, nonew:true, browser:true, devel:true, boss:true, curly:false, immed:false, latedef:true, newcap:true, plusplus:false, trailing:true, debug:false, asi:false, evil:false, expr:true, eqnull:false, esnext:false, funcscope:false, globalstrict:false, loopfunc:false */

(function($){
  "use strict";
  var
    $slideshow=$('.slideshow'),
    $divs=$slideshow.find('.images>div'),
    $btns=$slideshow.find('.btns'),
    $list=$btns.find('li'),
    $links=$list.find('a'),
    $triangle=$slideshow.find('.triangle'),
    currentSlide=0,
      
    makeWidthOfDivs=function(){
       for(var j=0;j<$divs.length;j++){
          var w=0;
          var $box=$divs.eq(j).find('div');
      
         for(var i=0;i<$box.length;i++){
             w += $box.eq(i).width();
          }
          w=$box.length*10+w;
          $divs.eq(j).width(w);
          var margin=(1100-w)/2;
          $divs.eq(j).css({marginLeft:margin});
         }
    },
    move=function(n,x){
       var $div = $divs.eq(n).find('div');
      $div.each(function(){
        var $this=$(this);
        $this.css({left:x});
      });
    },
    go=function(n,current){
      var
        $box1=$divs.eq(current).find('div'),
        $box2=$divs.eq(n).find('div'),
        $delay=$box1.length*200+200,
        ani=function($box,aniTime,delay,delayTime,y){
          $box.each(function(){
             var $this=$(this);
            setTimeout(function(){
              $this.animate({left:y},aniTime);
            },delay);
            delay+=delayTime;
          });
        };
        if(n>current){
          $box1.css({float:'left'});
          $box2.css({float:'left'});
          ani($box1,200,1,200,-1100);
          ani($box2,500,$delay,300,0);
        } else{
          $box1.css({float:'right'});
          $box2.css({float:'right'});
          ani($box1,200,1,200,1100);
          ani($box2,500,$delay,300,0);
        }
    },
    go2slide=function(n){
      if(n>currentSlide){
         move(n,1100);
         go(n,currentSlide);
         currentSlide=n;
        } else if(n<currentSlide){
          move(n,-1100);
          go(n,currentSlide);
          currentSlide=n;
        }
    },
    moveTriangle=function(n){
      var z=$list.eq(n).position().left;
      $triangle.animate({left:z},200);
    },
    makeSlidesFirst=function(){
      makeWidthOfDivs();
        for(var j=1;j<$divs.length;j++){
          move(j,1100);
        }
    },
    ajax=function(){
       $.address.change(function(evt){
       if(!evt.pathNames.length){
        $.address.value('/slide/1');
         go2slide(0);
         moveTriangle(0);
       }
       if(evt.pathNames[0]==='slide'){      
         var index=evt.pathNames[1]-1;
        
         go2slide(index);
         moveTriangle(index);
        }
     });
    
    },
    init=function(){
      $links.address();
      ajax();
      makeSlidesFirst();     
    };
    
  init();

  
})(window.jQuery);
