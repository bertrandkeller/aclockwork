(function($) {
    $(document).ready(function() {

      // * Enable ability to custom style all input elements based on their type
      $("input[type=text]").addClass("text");
      $("input[type=password]").addClass("password");
      $("input[type=email]").addClass("form-email");
      $("input[type=checkbox]").addClass("checkbox");
      $("input[type=radio]").addClass("radio");
      $("input[type=submit]").addClass("form-submit");
      $("input[type=button]").addClass("form-button");
      $("input[type=image]").addClass("form-image");
      $("input[type=file]").addClass("file");
      // $("input[type=file]", this).attr('size', "30"); // test for ie
        
      // Extensions to open in a new window
      var extensions_blank = ["pdf", "doc", "gif" , "jpg" , "ai" , "xls" , "docx" , "eps" , "zip" , "swf" , "bmp" , "qxd", "indd" ];
      jQuery.each(extensions_blank,
      function() {
          $('a[href$=.' + this + ']:not(.diaporama)').addClass('link-external document-' + this);
      }); 
   });
})(jQuery);
