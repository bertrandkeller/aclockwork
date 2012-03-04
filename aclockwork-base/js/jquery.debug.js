(function($) {
  
  $('#nav_debug').find('p.elementoff a').live('click', function() {
    var $this = $(this) ;
    $this.parent().removeClass("elementoff").addClass("elementon");
    $('.footer_main').before('<div id="include" class="container layout one_column"></div>');
    $('#include').inc('../themescouade/aclockwork-base/html/model_element.html', null, function() {});
  });
  $('#nav_debug').find('p.elementon a').live('click', function() {
    var $this = $(this) ;
    $this.parent().removeClass("elementon").addClass("elementoff");
    $('#include').remove();
  });
  
  $('#nav_debug').find('p.debug a').live('click', function() {
     if ( $.cookie('modeldebug') == 'debug' ) {
         $('body').toggleClass("debug");
         $.cookie('modeldebug','normal');
     } 
     else {
        $('body').toggleClass("debug");
        var widthselector = $('.debug .grid .col_main section[class^=col],.debug .grid aside[class^=col]') ;
        var nameselector = $('.debug .grid .block_fraction > div,.debug .grid [class$=_list]') ;
        widthselector.live('mouseenter',function () {
          var colwidth = $(this).width();       
          $(this).prepend('<span class="widthof"><span class="widthof_content">' + colwidth + 'px </span></span>');
        });
        widthselector.live('mouseleave',function () {
          $('.widthof').remove();
        });
        nameselector.live('mouseenter',function () {
           var classname = $(this).attr('class').split(" ")[0];            
           $(this).prepend('<span class="nameof"><span class="nameof_content">.' + classname + '</span></span>');
        });
        nameselector.live('mouseleave',function () {
          $('.nameof').remove();
        });
        $.cookie('modeldebug', 'debug');
     }
   });
})(jQuery);