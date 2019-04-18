
/**
 * Author         : CheneyLiu
 * Date           : date
 * isAuto:        true, 自动播放
 * transTime:     3000, 自动播放间隔
 * animateSpeed:  1000,  动画速度
 * sliderMode:    'slide', 类型//'slide | fade',
 * pointerControl: true, 指示器开关
 * pointerEvent:  'click', 指示器类型//'hover' | 'click',
 * arrowControl:  true, 左右控制
 */
;(function($) {
$.fn.Slider = function(options) {
  "use strict";

  var settings = $.extend({
    isAuto: true,
    transTime: 1000,
    animateSpeed: 300,  
    sliderMode: 'slide', //'slide | fade',
    pointerControl: true,
    pointerEvent: 'hover',//'hover' | 'click',
    arrowControl: true,
  }, options);
  var interval;
  var isAnimating     = false;
  var $slider         = $(this);
  var $sliderWrap     = $slider.find('.slider-inner');
  var sliderCount     = $sliderWrap.find('> .item').length;
  var sliderWidth     = $slider.width();
  var currentIndex    = 0;
  var arr1 = [];
  console.log(arr1[currentIndex]);
  $(".title1").html(arr1[currentIndex]);
  var sliderFun = {
    // autoPlay
    autoPlay: function() {
      if (settings.isAuto) {
        interval = setInterval(function () {
          var index = currentIndex;
          var arr1 = [];
          $(".title1").html(arr1[index]);
          (currentIndex == sliderCount - 1) ? index = 0: index = currentIndex + 1;
          sliderFun.sliderPlay(index);
        }, settings.transTime);
      }else{
        return;
      }
    },
    controlInit: function() {
      // pointerControl
      if (settings.pointerControl) {
        
        var html = '';
        html += '<ol class="slider-pointer">';
        for (var i = 0; i < sliderCount; i++) {
          if (i == 0) {
            html += '<li class="active"></li>'
          }else{
            html += '<li></li>'
          }
        }
        html += '</ol>'
        $slider.append(html);
          // 指示器居中
        var $pointer = $slider.find('.slider-pointer');
        $pointer.css({
          left: '50%',
          marginLeft: - $pointer.width()/2
        });
      }
      // pointerControl
      if (settings.arrowControl) {
        // var html = "";
        // html += '<span class="slider-control prev">&lt;</span>';
        // html += '<span class="slider-control next">&gt;</span>'
        // $slider.append(html);
        $slider.on('click', '.slider-control.prev', function(event) {
          sliderFun.toggleSlide('prev');
        });
        $slider.on('click', '.slider-control.next', function(event) {
          sliderFun.toggleSlide('next');
        });
      }
    },
    // slider
    sliderInit: function() {
      sliderFun.controlInit();
      // 模式选择
      if (settings.sliderMode == 'slide') {
        // slide 模式
        $sliderWrap.width(sliderWidth * sliderCount);
        $sliderWrap.children().width(sliderWidth);
      }else{
        // mode 模式
        $sliderWrap.children().css({
          'position': 'absolute',
          'left': 0,
          'top': 0
        });
        $sliderWrap.children().first().siblings().hide();
      }
      // 控制事件
      if (settings.pointerEvent == 'hover') {
        $slider.find('.slider-pointer > li').mouseenter(function(event) {
          sliderFun.sliderPlay($(this).index());
        });
      }else{
        $slider.find('.slider-pointer > li').click(function(event) {
          if (currentIndex != $(this).index()) {
        sliderFun.sliderPlay($(this).index())
      }
        });
      }
      // 自动播放
      sliderFun.autoPlay();
    },
    // slidePlay
    sliderPlay: function(index) {
      sliderFun.stop();
      isAnimating = true;
      $sliderWrap.children().first().stop(true, true);
      $sliderWrap.children().stop(true, true);
      $slider.find('.slider-pointer').children()
        .eq(index).addClass('active')
        .siblings().removeClass('active');
      if (settings.sliderMode == "slide") {
        // slide
        if (index > currentIndex) {
          $sliderWrap.animate({
        left: '-=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
    }, settings.animateSpeed, function() {
        sliderFun.stop();
        isAnimating = false;
        sliderFun.autoPlay()
    });
        } else if (index < currentIndex) {
          $sliderWrap.animate({
            left: '+=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
          }, settings.animateSpeed, function() {
            isAnimating = false;
            sliderFun.autoPlay();
          });
        } else {
          return;
        }
      }else{
        // fade
        if ($sliderWrap.children(':visible').index() == index) return;
        $sliderWrap.children().fadeOut(settings.animateSpeed)
          .eq(index).fadeIn(settings.animateSpeed, function() {
            isAnimating = false;
            sliderFun.autoPlay();
          });
      }
      currentIndex = index;
    },
    // toggleSlide
    toggleSlide: function(arrow) {
      if (isAnimating) {
        return;
      }
      var index;
      if (arrow == 'prev') {
        index = (currentIndex == 0) ? sliderCount - 1 : currentIndex - 1;
        sliderFun.sliderPlay(index);
      }else if(arrow =='next'){
        index = (currentIndex == sliderCount - 1) ? 0 : currentIndex + 1;
        sliderFun.sliderPlay(index);
      }
    },
    // autoPlay
    // autoPlay: function() {
    //   if (settings.isAuto) {
    //     interval = setInterval(function () {
    //       var index = currentIndex;
    //       console.log(index);
    //       var arr1 = ["要疯篮球鞋","闪能科技跑鞋","A-WING休闲鞋"];
    //       console.log(arr1[index]);
    //       $(".title1").html(arr1[index]);
    //       (currentIndex == sliderCount - 1) ? index = 0: index = currentIndex + 1;
    //       sliderFun.sliderPlay(index);
    //     }, settings.transTime);
    //   }else{
    //     return;
    //   }
    // },
    //stop
    stop: function() {
      clearInterval(interval);
    },
  };
  sliderFun.sliderInit();
}
})(jQuery);
jQuery(document).ready(function($) {
  $('#slider').Slider();

});