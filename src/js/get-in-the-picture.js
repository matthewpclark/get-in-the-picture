

// $( document ).ready(function() {
//     console.log( "ready!" );
// });

//news summary responsive borders and backgroud
(function($, viewport){
  //var bootstrapSmallBreakpoint    = 768;
  var bootstrapMediumBreakpoint   = 992;
  var headerPictureClass          = ".header-picture";
  var respnsiveHeaderPictureClass = 'header-picture-sm';

  function responsiveStyling() {
    if( $(window).width() >= bootstrapMediumBreakpoint ) {
        //remove it for larger layouts
        $(headerPictureClass).removeClass(respnsiveHeaderPictureClass);
    }

    if( $(window).width() < bootstrapMediumBreakpoint ) {
        //add our class for smaller layouts
        $(headerPictureClass).addClass(respnsiveHeaderPictureClass);
    }
  }

  $(document).ready(responsiveStyling);

  $(window).resize(responsiveStyling);

})(jQuery);

//enable popover functionality
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});
