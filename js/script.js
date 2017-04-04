$(function() {
  $('#exp').hover(function() {
    $('#overlay').css('background-color', 'rgba(255, 215, 0, 0.5)');
  }, function() {
    // on mouseout, reset the background colour
    $('#overlay').css('background-color', '');
  });
    $('#food').hover(function() {
    $('#overlay').css('background-color', 'rgba(255, 140, 0, 0.5)');
  }, function() {
    // on mouseout, reset the background colour
    $('#overlay').css('background-color', '');
  });
    $('#perform').hover(function() {
    $('#overlay').css('background-color', 'rgba(139, 0, 0, 0.5)');
  }, function() {
    // on mouseout, reset the background colour
    $('#overlay').css('background-color', '');
  });
});