(function($) {
    $(document).ready(function() {

    createDropDown();

    // Dropdown select with list of link
    $(".nav_select dt a").click(function() {
        $(".nav_select dd ul").toggle();
        return false;
    });
          
    $(".nav_select dd ul li a").click(function() {
        var text = $(this).html();
        $(".nav_select dt a span").html(text);
        $(".nav_select dd ul").hide();
    
        var source = $("#source");
        source.val($(this).find("span.value").html())
    });

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("dropdown"))
            $(".nav_select dd ul").hide();
    });

  });

  function createDropDown(){
      var source = $("#js-select-replace select");
      var selected = source.find("option[selected]");
      var options = $("option", source);
  
      $("#js-select-replace").append('<dl id="target" class="nav_select"></dl>')
      $("#target").append('<dt><a href="#"><span>' + selected.text() + 
          '</span><span class="value">' + selected.val() + 
          '</span></a></dt>')
      $("#target").append('<dd><ul></ul></dd>')

      options.each(function(){
          $("#target dd ul").append('<li><a href="#">' + 
              $(this).text() + '<span class="value">' + 
              $(this).val() + '</span></a></li>');
      });
  }

})(jQuery);