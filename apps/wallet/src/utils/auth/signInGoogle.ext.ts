import { GoogleAuthProvider, signInWithCredential } from '@firebase/auth';

import { auth } from './../firebase/index.ext';

export const signInWithGoogle = async () => {
	const responseUrl = await chrome.identity.launchWebAuthFlow({
		interactive: true,
		url: getGoogleAuthURL(),
	});
	const queryString = responseUrl?.split('#')?.[1];
	const searchParams = new URLSearchParams(queryString);
	const token = searchParams.get('access_token');
	const credential = GoogleAuthProvider.credential(null, token);
	const userCredential = await signInWithCredential(auth(), credential);

	return userCredential.user;
};

const getGoogleAuthURL = () => {
	const redirectURL = chrome.identity.getRedirectURL();
	const scopes = ['openid', 'email', 'profile'];
	let authURL = 'https://accounts.google.com/o/oauth2/auth';
	authURL += `?client_id=${BROWSER_CLIENT_ID}`;
	authURL += `&response_type=token`;
	authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
	authURL += `&scope=${encodeURIComponent(scopes.join(' '))}`;

	return authURL;
};
