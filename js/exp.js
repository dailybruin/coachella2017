var photosheetkey = "1wxIlU9pjKDcAfZrX4XmzAfCBA1cpWP1TrmoUGpvWa-c";
var recapsheetkey = "1ffCXCveuwLrG7jL20bTsATxGIxSWDvjTloNQAn_3H-M";
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
		$(".content-main").append(photocard_compiled({carddata: data}));
	});	

	// RECAP HANDLING
	var recapsheeturl = "https://spreadsheets.google.com/feeds/list/" + recapsheetkey + "/od6/public/values?alt=json"; 
	$.getJSON(recapsheeturl, function(data) {
		data = clean_google_sheet_json(data);
		if (data.length > 0) {
			$(".leftbyline").show();
			var todaysrecap = data[0];
			var recaparray = format_body_text(todaysrecap.text);
			var halfway = Math.floor(recaparray.length / 2) + 3;
			recaparray.splice(0, 0, "<h2 class=\"recap-headline\">" + todaysrecap.headline + "</h2>");
			recaparray.splice(1, 0, "<img class=\"recap-primary\" src=\"" + todaysrecap.photo1 + "\" />");
			recaparray.splice(2, 0, "<p class=\"recap-caption\">" + todaysrecap.caption1 + "</p>");
			recaparray.splice(halfway, 0, "<img class=\"recap-secondary\" src=\"" + todaysrecap.photo2 + "\" />");
			recaparray.splice(halfway + 1, 0, "<p class=\"recap-caption\">" + todaysrecap.caption2 + "</p>");
			for (var i = 0; i < recaparray.length; i++) {
				$(".recap").append(recaparray[i]);
			}
			$(".recap").show();
		}
	});
};

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

function format_body_text(t) {
	t = t.trim();
	var re = new RegExp('[\r\n]+', 'g');
    var str = t.length>0?'<p>'+t.replace(re,'</p>\n<p>')+'</p>':null;
    return (str.split('\n'));
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}