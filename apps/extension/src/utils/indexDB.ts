import { Dexie } from 'dexie';

export class WallessDB extends Dexie {
	privateKeys!: Dexie.Table<IPrivateKey, number>;

	constructor() {
		super('WallessDB');
		this.version(1).stores({
			privateKeys: '++id, key, net, iv',
		});
	}
}

export const db = new WallessDB();

enum PrivateKeyType {
	SOLANA = 'SOLANA',
	TKEY = 'TKEY',
	SUI = 'SUI',
}

interface IPrivateKey {
	key: string;
	net: PrivateKeyType;

	iv: Uint8Array;
}

export class PrivateKey implements IPrivateKey {
	key: string;
	net: PrivateKeyType;
	iv: Uint8Array;

	constructor(key: string, net: PrivateKeyType, iv: Uint8Array) {
		this.key = key;
		this.net = net;
		this.iv = iv;
	}

	save() {
		db.privateKeys.put(new PrivateKey(this.key, this.net, this.iv));
	}
}

db.privateKeys.mapToClass(PrivateKey);

export const getAllPrivateKey = async () => {
	const privateKeys = await db.privateKeys.where('').above(0).toArray();
	return privateKeys;
};

export const saveSample = async () => {
	const newKey = new PrivateKey(
		'hello',
		PrivateKeyType.SOLANA,
		new Uint8Array(2),
	);
	await newKey.save();
};
