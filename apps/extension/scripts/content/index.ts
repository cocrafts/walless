import { observeAuthentication } from './authListener';
import { injectScript } from './utils';

console.log('content script loaded');

observeAuthentication();
injectScript('injection.js');
