document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("count-start").addEventListener("click", function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.browserAction.setBadgeText({text: "..."});
			document.getElementById("count-result").innerHTML = "<h3>Now counting...</h3>";
			chrome.tabs.sendMessage(tabs[0].id, {"event": "start"}, function(count) {
				chrome.browserAction.setBadgeText({text: count});
				document.getElementById("count-result").innerHTML = "<h3>Completed. " + count + "</h3>";
				alert("Tweet Counting completed. " + count);
			});
		});
	});
	document.getElementById("count-stop").addEventListener("click", function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {"event": "stop"}, function(count) {
				chrome.browserAction.setBadgeText({text: "x"});
				document.getElementById("count-result").innerHTML = "<h3>Stopped. " + count + "</h3>";
			});
		});
	});
});
