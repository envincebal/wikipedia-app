$(document).ready(function(){
	$(".search-box").submit(searching);
	$(".search-img").click(searching);
});

function searching(event){
	event.preventDefault();
	var userInput = $(".input").val();
	var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userInput + "&format=json&callback?";
	var $results = $(".result-items");

	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: wikiUrl,
		success: function(data){
			for (var i = 0; i < data[1].length; i++) {
				$results.append("<li class='item'><h2 class='item-header'><a href='" + data[3][i] + "'>" + data[1][i] + "</a></h2><p class='summary'>" + data[2][i] +"</p></li>");
			}
		}
	})
}
