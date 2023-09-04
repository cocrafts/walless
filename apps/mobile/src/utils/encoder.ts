export class TextEncoder {
	encode(value: string) {
		console.log(value, '<val');
		return Buffer.from(value, 'utf-8');
	}
	decode(ciphered: Uint8Array) {
		console.log(ciphered, '<chip');
		return Buffer.from(ciphered).toString('utf-8');
	}
}
