const wasmCache: { [key: string]: WebAssembly.Instance } = {};

const emptyModule = { exports: {} };

export interface WallAsm {
	add: (a: number, b: number) => number;
}

const defaultImports: WebAssembly.Imports = {
	env: {},
};

export const loadWasm = async <T = WallAsm>(
	uri: string,
	imports: WebAssembly.Imports = defaultImports,
): Promise<T> => {
	if (wasmCache[uri]) return wasmCache.browser.exports as T;

	try {
		const response = await fetch(uri);
		const buffer = await response.arrayBuffer();
		const { instance } = await WebAssembly.instantiate(buffer, imports);

		wasmCache[uri] = instance;
	} catch (e) {
		wasmCache[uri] = emptyModule;
	}

	return wasmCache[uri].exports as T;
};
