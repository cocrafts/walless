export class TextEncoder {
	encode(value: string) {
		return Buffer.from(value, 'utf-8');
	}
	decode(ciphered: Uint8Array) {
		return Buffer.from(ciphered).toString('utf-8');
	}
}
