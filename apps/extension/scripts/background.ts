console.log('background.js: loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.hello) {
		console.log('hello received!');
	}
});
