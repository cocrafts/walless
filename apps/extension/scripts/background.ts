import { getNFTs } from '@walless/network';
import { runtime } from 'webextension-polyfill';

console.log('background.js: loaded');

runtime.onMessage.addListener((request) => {
	if (request.hello) {
		console.log('hello received!');
	}
});

import { queryAll } from '@walless/network';

const SAMPLE_KEY = 'D4zHiywS9ELy7pvFKjvsR3KNJxAvi72EqsmkUhVXG471';

const start = async () => {
	const obj = await queryAll(SAMPLE_KEY);
	console.log(obj);

	getNFTs();
};

start();

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
