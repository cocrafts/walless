import { consoleTransport, logger as log } from 'react-native-logs';

export const logger = log.createLogger({
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
	},
	severity: __DEV__ ? 'debug' : 'error',
	transport: consoleTransport,
	async: true,
});
