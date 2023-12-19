import {
	decryptMessage,
	deserialize,
	encryptMessage,
	generateKeyPair,
	serialize,
} from '../utils/p2p';

const generateRandomKeyPairs = () => {
	const clientKeypair = generateKeyPair();
	const clientPublicKeyHex = Buffer.from(clientKeypair.publicKey).toString(
		'hex',
	);
	const serverKeypair = generateKeyPair();
	const serverPublicKeyHex = Buffer.from(serverKeypair.publicKey).toString(
		'hex',
	);
	return {
		clientKeypair,
		clientPublicKeyHex,
		serverKeypair,
		serverPublicKeyHex,
	};
};

test('encrypt/decrypt with shared key', async () => {
	const {
		clientKeypair,
		clientPublicKeyHex,
		serverKeypair,
		serverPublicKeyHex,
	} = generateRandomKeyPairs();

	const payload = {
		message: 'hello world',
	};

	const encryptedPayload = await encryptMessage(
		serverPublicKeyHex,
		clientKeypair,
		serialize(payload),
	);

	const decryptedPayload = deserialize(
		await decryptMessage(
			Buffer.from(encryptedPayload, 'hex'),
			clientPublicKeyHex,
			serverKeypair,
		),
	);

	expect(decryptedPayload.message).toBe(payload.message);
});

test('encrypt/decrypt with shared key multiple times', async () => {
	const {
		clientKeypair,
		clientPublicKeyHex,
		serverKeypair,
		serverPublicKeyHex,
	} = generateRandomKeyPairs();

	const payload = {
		message: 'hello world',
	};

	for (let i = 0; i < 10; i++) {
		payload.message += i;
		const encryptedPayload = await encryptMessage(
			serverPublicKeyHex,
			clientKeypair,
			serialize(payload),
		);

		const decryptedPayload = deserialize(
			await decryptMessage(
				Buffer.from(encryptedPayload, 'hex'),
				clientPublicKeyHex,
				serverKeypair,
			),
		);

		expect(decryptedPayload.message).toBe(payload.message);
	}
});

test('encrypt/decrypt big object with shared key', async () => {
	const {
		clientKeypair,
		clientPublicKeyHex,
		serverKeypair,
		serverPublicKeyHex,
	} = generateRandomKeyPairs();

	const payload = {
		message:
			"I'd spend hours building things, imagining new worlds, new machines, new concepts, then i'd take them apart and create a whole new idea to explore.I'd spend hours building things, imagining new worlds, new machines, new concepts, then i'd take them apart and create a whole new idea to explore.I'd spend hours building things, imagining new worlds, new machines, new concepts, then i'd take them apart and create a whole new idea to explore.I'd spend hours building things, imagining new worlds, new machines, new concepts, then i'd take them apart and create a whole new idea to explore.I'd spend hours building things, imagining new worlds, new machines, new concepts, then i'd take them apart and create a whole new idea to explore.",
	};

	const encryptedPayload = await encryptMessage(
		serverPublicKeyHex,
		clientKeypair,
		serialize(payload),
	);

	const decryptedPayload = deserialize(
		await decryptMessage(
			Buffer.from(encryptedPayload, 'hex'),
			clientPublicKeyHex,
			serverKeypair,
		),
	);

	expect(decryptedPayload.message).toBe(payload.message);
});
