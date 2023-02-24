console.log('background.js: loaded');
const logTitle = '[Background service]: '

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.hello) {
		console.log('hello received!');
	}
});

import {
	queryAll,
	subcribeWithPublicKeyString,
	unSubcribe
} from '@walless/network'

const SAMPLE_KEY = 'D4zHiywS9ELy7pvFKjvsR3KNJxAvi72EqsmkUhVXG471'


const obj = await queryAll(SAMPLE_KEY)
console.log(obj)

// const connectionId = subcribeWithPublicKeyString(
// 	SAMPLE_KEY,
// 	() => {
// 		console.log(logTitle + "Onchange")
// 		queryAll(SAMPLE_KEY)
// 	})

// console.log(logTitle + "connection id ->" + connectionId)


// setTimeout(() => {
// 	unSubcribe(connectionId)
// 	console.log(logTitle + connectionId + "unSubcribe")
// }, 200000)