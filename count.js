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
	const SCROLL_SEQ = 10;
	const SCROLL_TIME = 1000;
	const SCROLL_RETRY = 3;

	var retryCount = 0;

	const SUMMARY_KEY = "tweet_counter_summary";

	localStorage.clear();
	localStorage.setItem(SUMMARY_KEY, JSON.stringify({}));

	var doCount = function() {
		if (terminated) return callback(String(tweetCount));

		var tweets = document.querySelectorAll("div.content > div.stream-item-header");
		var tempCount = 0;

		var dateElement = null;
		var d = null;
		var date = 0;
		var dCount = 0;
		var summary = {};

		for(var i = 0; i < tweets.length; i++){
			if (tweets[i].querySelector("small.Icon--promoted") != null) continue;
			tempCount++;

			dateElement = tweets[i].querySelector("span._timestamp");
			if (dateElement != null) {
			  d = new Date(parseInt(dateElement.getAttribute("data-time-ms")));
			} else {
				d = new Date();
			}
			date = d.getFullYear()*10000 + (d.getMonth() + 1)*100 + d.getDate();
			dCount = 0;
			summary = JSON.parse(localStorage.getItem(SUMMARY_KEY));
			if (summary[String(date)] != null) dCount = parseInt(summary[String(date)]);
			summary[String(date)] = dCount + 1;
			localStorage.setItem(SUMMARY_KEY, JSON.stringify(summary));
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

		for (var i = 0; i < SCROLL_SEQ; i++) {
			scrollBy(0, SCROLL_HEIGHT);
		}
		console.log("scrolling...");

		setTimeout(doCount, SCROLL_TIME);
	};

	doCount();

	return true;
});
