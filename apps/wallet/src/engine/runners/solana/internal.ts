import pThrottle from 'p-throttle';

export const throttle = pThrottle({ limit: 4, interval: 1000 });
