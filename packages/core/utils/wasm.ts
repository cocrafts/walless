const wasmCache: Record<string, WebAssembly.Instance> = {};

const emptyModule = { exports: {} };

export const loadWasm = async (uri: string) => {
	if (wasmCache[uri]) return wasmCache.browser.exports;

	try {
		const response = await fetch(uri);
		const buffer = await response.arrayBuffer();
		const { instance } = await WebAssembly.instantiate(buffer);

		wasmCache[uri] = instance;
	} catch {
		wasmCache[uri] = emptyModule;
	}

	return wasmCache[uri].exports;
};
