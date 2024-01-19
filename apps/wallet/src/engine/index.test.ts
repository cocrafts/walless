jest.mock('utils/storage/db');
import { createEngine } from 'engine';

describe('test engine', () => {
	test('run engine correctly', async () => {
		const engine = await createEngine();
		const counts: number[] = [];
		engine.register('firstRunner', (config) => {
			expect(config).not.toBeNull();
			return {
				start() {
					counts.push(1);
				},
				stop() {
					counts.push(-1);
				},
				restart() {},
				getContext() {},
			};
		});

		await engine.start();
		expect(counts[0]).toEqual(1);
		engine.stop();
		expect(counts[0]).toEqual(1);
		expect(counts[1]).toEqual(-1);
	});

	test('register conflict', async () => {
		const engine = await createEngine();
		engine.register('firstRunner', () => {
			return {
				start() {},
				stop() {},
				restart() {},
				getContext() {},
			};
		});
		expect(() => {
			engine.register('firstRunner', () => {
				return {
					start() {},
					stop() {},
					restart() {},
					getContext() {},
				};
			});
		}).toThrow(Error);
	});

	test('get context before start', async () => {
		const engine = await createEngine();
		engine.register('firstRunner', () => {
			const context = 'first runner context';
			return {
				start() {},
				stop() {},
				restart() {},
				getContext() {
					return context;
				},
			};
		});

		const context = engine.getContext('firstRunner');
		expect(context).toBe(undefined);
	});

	test('get context after start', async () => {
		const engine = await createEngine();
		engine.register('firstRunner', () => {
			const context = 'first runner context';
			return {
				start() {},
				stop() {},
				restart() {},
				getContext() {
					return context;
				},
			};
		});

		await engine.start();

		const context = engine.getContext<string>('firstRunner');
		expect(context).toBe('first runner context');
	});

	test('async runners', async () => {
		const engine = await createEngine();
		let count = 0;
		engine.register('firstRunner', () => {
			return {
				async start() {
					await wait(100);
					count++;
				},
				stop() {},
				restart() {},
				getContext() {},
			};
		});

		engine.register('secondRunner', () => {
			return {
				async start() {
					await wait(100);
					count++;
				},
				stop() {},
				restart() {},
				getContext() {},
			};
		});

		await engine.start();
		setTimeout(() => {
			expect(count).toBe(2);
		}, 100);
	});

	test('async runners failed without wait engine start', async () => {
		const engine = await createEngine();
		let count = 0;
		engine.register('firstRunner', () => {
			return {
				async start() {
					count++;
				},
				stop() {},
				restart() {},
				getContext() {},
			};
		});

		engine.register('secondRunner', () => {
			return {
				async start() {
					count++;
				},
				stop() {},
				restart() {},
				getContext() {},
			};
		});

		engine.start();
		expect(count).toBe(0);
	});

	test('async runners wait engine start', async () => {
		const engine = await createEngine();
		let count = 0;
		engine.register('firstRunner', () => {
			return {
				async start() {
					count++;
				},
				stop() {},
				restart() {},
				getContext() {},
			};
		});

		engine.register('secondRunner', () => {
			return {
				async start() {
					count++;
				},
				stop() {},
				restart() {},
				getContext() {},
			};
		});

		await engine.start();
		expect(count).toBe(2);
	});
});

const wait = (amount: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(amount);
		}, amount);
	});
};
