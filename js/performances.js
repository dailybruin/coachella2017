$( document ).ready(function() {
  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1OoKmB6DWMwbQjuwyUty_QHixRz7CsmcO03uECK_XQ3M/edit?usp=sharing#gid=0';
  var articleTemplate = Handlebars.compile($('#template').html());
  $('#article').sheetrock({
    url: mySpreadsheet,
    query: "select B",
    rowTemplate: articleTemplate
  });
});
