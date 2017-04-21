$( document ).ready(function() {
  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1blB7Wn60BIDqP3DMH8SrIVX-whtVudcSwlbjBWgd7Nw/edit?usp=sharing#gid=0';
  var articleTemplate = Handlebars.compile($('#template').html());
  $('#article').sheetrock({
    url: mySpreadsheet,
    query: "select A,B,C",
    rowTemplate: articleTemplate
  });
});
