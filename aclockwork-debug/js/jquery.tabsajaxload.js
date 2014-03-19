 head.ready(function() {
      if ($.browser.msie) {}
      else {
       gethash();
       $('#nav_main a,.block_logo a').live('click',function(event){
         var attribut = $(this).attr('href');
         if ( attribut === "#") {
           event.preventDefault();
         }
         else {
           $(this).parent().siblings().removeClass();
           $(this).parent().addClass('active');
           window.location.hash = '#' + attribut.slice(11,-4);
           $('#includehtml .container_int').inc(attribut);
         }
       });
      }
      function gethash() {
        var hash = document.location.hash;
            container = $('#includehtml .container_int');

        if ( hash.length == 0) {
          container.inc('model_page_principale.php');
        }
        else {
          var path = hash.substring(1) + '.php'
          container.inc(path);
        }
      }
    });