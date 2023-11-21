export class TextEncoder {
	encode(value: string) {
		return Buffer.from(value, 'utf-8');
	}
	decode(ciphered: Uint8Array) {
		return Buffer.from(ciphered).toString('utf-8');
	}
}

export class TextDecoder {
	decode(value: string) {
		return Buffer.from(value, 'utf-8');
	}
	encode(ciphered: Uint8Array) {
		return Buffer.from(ciphered).toString('utf-8');
	}
}
