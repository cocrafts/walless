import { consoleTransport, logger as log } from 'react-native-logs';

const configuredServerity = global.localStorage?.getItem('log-level');
const defaultServerity = __DEV__ ? 'debug' : 'error';

export const logger = log.createLogger({
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
	},
	severity: configuredServerity || defaultServerity,
	transport: consoleTransport,
	async: true,
});
