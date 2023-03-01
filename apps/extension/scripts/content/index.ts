import { observeAuthentication } from './authListener';

console.log('content script loaded');

observeAuthentication();
