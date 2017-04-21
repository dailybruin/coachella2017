$( document ).ready(function() {
  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1OoKmB6DWMwbQjuwyUty_QHixRz7CsmcO03uECK_XQ3M/edit?usp=sharing#gid=0';
  var articleTemplate = Handlebars.compile($('#template').html());
  $('#article').sheetrock({
    url: mySpreadsheet,
    query: "select A,B,C",
    rowTemplate: articleTemplate
  });
  $(window).on("load",function() {
    $(window).scroll(function() {
      var windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $(".module-left").each(function() {
        /* Check the location of each desired element */
        var objectBottom = $(this).offset().top + $(this).outerHeight();
        /* If the element is completely within bounds of the window, fade it in */
        if (objectBottom < windowBottom) { //object comes into view (scrolling down)
          if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
        } else { //object goes out of view (scrolling up)
          if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
        }
      });
    }).scroll(); //invoke scroll-handler on page-load
  });
});
