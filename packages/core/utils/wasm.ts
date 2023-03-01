const wasmCache: Record<string, any> = {};

const emptyModule = { exports: {} };

export interface WallAsm {
	add: (a: number, b: number) => number;
}

export const loadWasm = async <T = WallAsm>(uri: string) => {
	if (wasmCache[uri]) return wasmCache.browser.exports;

	try {
		const response = await fetch(uri);
		const buffer = await response.arrayBuffer();
		const { instance } = await WebAssembly.instantiate(buffer);

		wasmCache[uri] = instance;
	} catch {
		wasmCache[uri] = emptyModule;
	}

	return wasmCache[uri].exports as T;
};
