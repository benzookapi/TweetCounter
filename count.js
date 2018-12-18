var tweetCount = 0;
var terminated = false;
chrome.runtime.onMessage.addListener(function(message, sender, callback) {
	console.log(message);
	console.log(sender);
	if (message.event == "stop") {
		terminated = true;
		console.log("stoped.");
		return callback(String(tweetCount));
	}
	terminated = false;
	const SCROLL_HEIGHT = 10000;
	const SCROLL_TIME = 2000;
	const SCROLL_RETRY = 2;
	var retryCount = 0;
	var doCount = function() {
		if (terminated) return callback(String(tweetCount));
		var tweets = document.querySelectorAll("div.content > div.stream-item-header");
		var tempCount = 0;
		//var dateElement = null;
		//var d = null;
		//var date = 0;
		for(var i = 0; i < tweets.length; i++){
			/*dateElement = tweets[i].querySelector("span._timestamp");
			if (dateElement != null) {
			  d = new Date(parseInt(dateElement.getAttribute("data-time-ms")));
			} else {
				d = new Date();
			}
			date = d.getFullYear()*10000 + (d.getMonth() + 1)*100 + d.getDate();
			console.log("date: " + date);*/
			if (tweets[i].querySelector("small.Icon--promoted") != null) continue;
			tempCount++;
		}
		console.log("tempCount: " + tempCount);
		console.log("tweetCount: " + tweetCount);
		if (tweetCount == tempCount) {
			retryCount++;
			if (retryCount > SCROLL_RETRY) {
				console.log("completed.");
				return callback(String(tweetCount));
			}
			console.log("retrying scrolling[" + retryCount + "]...");
		} else {
			retryCount = 0;
		}
		tweetCount = tempCount;
		scrollBy(0, SCROLL_HEIGHT);
		console.log("scrolling...");
		setTimeout(doCount, SCROLL_TIME);
	};
	doCount();
	return true;
});
