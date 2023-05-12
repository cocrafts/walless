import { ConnectionCreator, ConnectionPool } from './type';

type CreatePoolOptions<T> = {
	create: ConnectionCreator<T>;
};

export const createConnectionPool = <T>({
	create,
}: CreatePoolOptions<T>): ConnectionPool<T> => {
	const cache: Record<string, T> = {};

	return {
		create,
		get: (id) => {
			if (!cache[id]) {
				cache[id] = create(id);
			}

			return cache[id];
		},
	};
};
