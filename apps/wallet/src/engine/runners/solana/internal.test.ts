import { withRetry } from './internal';

test('withRetry success', async () => {
	let count = 0;
	const f = async (): Promise<number> => {
		if (count < 3) {
			count++;
			throw Error('failed');
		}

		return count;
	};
	const result = await withRetry(f, { maxRetry: 3, interval: 10 })();
	expect(result).toBe(3);
});

test('withRetry wrong maxRetry', async () => {
	let count = 0;
	const f = async (): Promise<number> => {
		if (count < 3) {
			count++;
			throw Error('failed');
		}

		return count;
	};
	const result = withRetry(f, { maxRetry: 2, interval: 10 })();
	await expect(result).rejects.toThrow(Error('failed'));
});
