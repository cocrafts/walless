import type { Endpoint } from '@walless/core';
import type { Database } from '@walless/store';
import type { GraphQLClient } from 'graphql-request';

import type {
	ConnectionPool,
	EngineCrawler,
	EngineRunner,
	RunnerContext,
} from './type';

type CreateCrawlerOption<T> = EngineRunner<T> & {
	storage: Database;
	qlClient: GraphQLClient;
	endpoint: Endpoint;
	pool: ConnectionPool<T>;
};

type CrawlerInternal<T> = {
	endpoint: Endpoint;
	connection: T;
};

export const createCrawler = <T>({
	storage,
	qlClient,
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
		storage,
		qlClient,
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
