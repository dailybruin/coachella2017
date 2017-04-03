$(function() {
  $('#exp').hover(function() {
    $('#overlay').css('background-color', 'rgba(255, 255, 102, 0.5)');
  }, function() {
    // on mouseout, reset the background colour
    $('#overlay').css('background-color', '');
  });
    $('#food').hover(function() {
    $('#overlay').css('background-color', 'rgba(255, 69, 0, 0.5)');
  }, function() {
    // on mouseout, reset the background colour
    $('#overlay').css('background-color', '');
  });
    $('#perform').hover(function() {
    $('#overlay').css('background-color', 'rgba(205, 92, 92, 0.5)');
  }, function() {
    // on mouseout, reset the background colour
    $('#overlay').css('background-color', '');
  });
});