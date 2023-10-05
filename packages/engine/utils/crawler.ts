import type { Endpoint, EndpointMap } from '@walless/core';

import type {
	ConnectionPool,
	EngineCrawler,
	EngineRunner,
	RunnerContext,
} from './type';

type CreateCrawlerOption<T> = EngineRunner<T> & {
	endpoint: Endpoint;
	pool: ConnectionPool<T>;
};

type CrawlerInternal<T> = {
	endpoint: Endpoint;
	connection: T;
};

export const createCrawler = <T>({
	pool,
	stop,
	start,
	endpoint,
}: CreateCrawlerOption<T>): EngineCrawler<T> => {
	const internal: CrawlerInternal<T> = {
		endpoint,
		connection: pool.get(endpoint),
	};

	const createRunnerContext = (): RunnerContext<T> => ({
		endpoint: internal.endpoint,
		connection: internal.connection,
	});

	return {
		pool,
		stop: () => stop(createRunnerContext()),
		start: () => start(createRunnerContext()),
		connection: internal.connection,
		getEndpoint: () => internal.endpoint,
		setEndpoint: (endpoint) => {
			internal.endpoint = endpoint;
			internal.connection = pool.get(endpoint);
		},
	};
};

const defaultEndpoint: Endpoint = __DEV__ ? 'devnet' : 'mainnet';

export const defaultEndpoints: EndpointMap = {
	solana: defaultEndpoint,
	sui: defaultEndpoint,
	ethereum: defaultEndpoint,
	tezos: defaultEndpoint,
	aptos: defaultEndpoint,
};
