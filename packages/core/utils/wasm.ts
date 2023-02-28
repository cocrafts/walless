const wasmCache: Record<string, WebAssembly.Instance> = {};

export const loadWasm = async (uri: string) => {
	if (wasmCache[uri]) return wasmCache.browser.exports;

	const response = await fetch(uri);
	const buffer = await response.arrayBuffer();
	const { instance } = await WebAssembly.instantiate(buffer);

	wasmCache[uri] = instance;
	return instance.exports;
};
