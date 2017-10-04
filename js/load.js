$( document ).ready(function() {
		processData('data.csv');
});

function getSuffix(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
  }
}

function processData(filename) {
	
	d3.csv(filename, function(data) {
  		data.forEach(function(d) {
  			$article = $("<article>");
  			$div = $("<div>", {"class": "inner"});
  			$date = $("<span>",{"class":"date"});
  			$div.append($date);
        $day = $("<span>", {"class": "day"});
        $month = $("<span>", {"class": "month"});
        $year = $("<span>", {"class": "year"});
        indate = Date.parse(d.Date);
        inday = indate.toString("dd");
        suffix = getSuffix(inday);
        $day.html(inday + "<sup>" + suffix + "</sup>");
        inmonth = indate.toString("MMMM");
        if (inmonth.length>4) {
          inmonth = inmonth.substring(0,3);
        }
        $month.html(inmonth);
        inyear = indate.toString("yyyy");
        $year.html(inyear);
        $date.append($day);
        $date.append($month);
        $date.append($year);
  			$title = $("<h2>");
  			$title.html(d.Title);
  			$div.append($title);
        $img = $("<img>", {"src":d.Picture});
        $div.append($img);
        //$body = $("<p>");
        //$body.html(d["Short desc"]);
        //$div.append($body);
  			$article.append($div);
  			$('#timeline').append($article);
  		});
	});
}