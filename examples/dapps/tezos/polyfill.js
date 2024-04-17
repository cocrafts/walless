// const originalPostMessage = window.postMessage;

// console.log('polyfill window.postMessage');
// global.window.postMessage = function (...args) {
// 	console.log('call post message:', args);
// 	originalPostMessage(...args);
// 	if (args.length == 1) {
// 		console.log('post to parent without target', args);
// 		window.parent.postMessage(args[0], '*');
// 	}
// };

window.addEventListener('message', (e) => {
	if (e.origin === 'http://localhost:3011') {
		window.parent.postMessage(e.data, '*');
	} else {
		console.log('on message from external', e.data, e.origin);
	}
});
