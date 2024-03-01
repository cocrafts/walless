import { logger } from '@walless/core';
import pThrottle from 'p-throttle';

export const throttle = pThrottle({ limit: 10, interval: 1000 });

type RetryOptions = {
	maxRetry: number;
	interval: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...arguments_: readonly any[]) => unknown;

export const withRetry = <T extends AnyFunction>(
	func_: T,
	{ maxRetry, interval }: RetryOptions,
): T => {
	let count = 0;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (async (...args: any[]) => {
		while (count <= maxRetry) {
			try {
				return await func_(args);
			} catch (error) {
				logger.error(error);
				if (count < maxRetry) {
					await new Promise((resolve) => setTimeout(resolve, interval));
					count++;
				} else {
					throw error;
				}
			}
		}
	}) as T;
};
