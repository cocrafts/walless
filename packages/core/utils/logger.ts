import { consoleTransport, logger as log } from 'react-native-logs';

const configuredServerity = global.localStorage?.getItem('log-level');
const defaultServerity = __DEV__ ? 'debug' : 'error';

type LogLevels = 'debug' | 'info' | 'warn' | 'error';

export const logger = log.createLogger<LogLevels>({
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
	},
	transportOptions: {
		colors: {
			debug: 'cyanBright',
			info: 'blueBright',
			warn: 'yellowBright',
			error: 'redBright',
		},
	},
	severity: configuredServerity || defaultServerity,
	transport: consoleTransport,
	async: true,
});
