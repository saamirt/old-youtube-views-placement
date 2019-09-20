// ==UserScript==
// @name         Youtube old view placement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch*
// @grant        none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

let prevViewCount = ""

let pollElementText = function(selector, callback) {
	if ($(selector).length && !!$(selector).text().trim()) {
		callback();
	}
	setTimeout(function() {
		pollElementText(selector, callback);
	}, 500);
};

pollElementText("h1.title", function() {
	console.log("checking if views are different");
	console.log(`${prevViewCount} vs ${$('.view-count').text().trim()}`);
	if ($('#tampermonkey-views').length < 1 || $('.view-count').text().trim() != prevViewCount){
		console.log("Adding new views element");
		if ($('#tampermonkey-views').length < 1){
			$('#info-contents .title').before('<h1 class="title style-scope ytd-video-primary-info-renderer" style="display: inline-block;float: right;"><yt-formatted-string force-default-style="" id="tampermonkey-views" class="style-scope ytd-video-primary-info-renderer">1,506,794 Views</yt-formatted-string></h1>');
		}
		$('#tampermonkey-views').text($('.view-count').text());
		prevViewCount = $('#tampermonkey-views').text().trim();
	}
});
