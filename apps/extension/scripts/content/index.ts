import { boostrapMessaging } from './messaging';
import { injectScript } from './utils';

boostrapMessaging();
injectScript('injection.js');

console.log('content script loaded');
