(function($) {
    
    var nav_skiplink = $("#nav_skiplink")
    
    // liens d'evitement
    nav_skiplink
    .find('a')
    .focus(function() {
        nav_skiplink.addClass('accessibility_on');
    })
    .blur(function() {
        nav_skiplink.removeClass('accessibility_on');
    });
    
    // External link added on other hostnames link
    $(":not(a.diaporama)").filter(function() {
      return this.hostname && this.hostname !== location.hostname;
    }).addClass('link-external');

    // open link in new window
    $("a.link-external").click(function(event) {
        window.open(this.href);
        event.preventDefault();
    });
    
    // default top page smooth scroll
    $('.toppage').find('a').click(function(event) {
        $.scrollTo('#top', 1000);
        event.preventDefault();
    });
  
})(jQuery);
