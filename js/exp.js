var photosheetkey = "1W6mZTayIG0hKyfFa-RcOcY05VX2fmrM8gijPVJdm34U";
var photocard_template = $("#card-template").html();
var photocard_compiled = Handlebars.compile(photocard_template);

Handlebars.registerHelper("formatcaptiontext", function(t) {
	t = t.trim();
	var re = new RegExp('[\r\n]+', 'g');
    return (t.length>0?'<p class="cardcaption">'+t.replace(re,'</p><p class="cardcaption">')+'</p>':null);
});

init();

function init() {
	var photosheeturl = "https://spreadsheets.google.com/feeds/list/" + photosheetkey + "/od6/public/values?alt=json"; 
	$.getJSON(photosheeturl, function(data) {
		data = clean_google_sheet_json(data);
		data = data.reverse();
		$(".mainstory").append(photocard_compiled({carddata: data}));
		
	});	
function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
};
}

function format_body_text(t) {
	t = t.trim();
	var re = new RegExp('[\r\n]+', 'g');
    var str = t.length>0?'<p>'+t.replace(re,'</p>\n<p>')+'</p>':null;
    return (str.split('\n'));
}
