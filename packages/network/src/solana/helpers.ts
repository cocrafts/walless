import { PublicKey } from '@solana/web3.js';

import { METADATA_PROGRAM_KEY } from './constants';

export const getMetadataPda = (mint: PublicKey) => {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('metadata', 'utf-8'),
			METADATA_PROGRAM_KEY.toBuffer(),
			mint.toBuffer(),
		],
		METADATA_PROGRAM_KEY,
	);
};

export const getMasterEditionPda = (mint: PublicKey) => {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('metadata', 'utf-8'),
			METADATA_PROGRAM_KEY.toBuffer(),
			mint.toBuffer(),
			Buffer.from('edition', 'utf-8'),
		],
		METADATA_PROGRAM_KEY,
	);
};

export const getTokenRecordPda = ({
	mint,
	token,
}: {
	mint: PublicKey;
	token: PublicKey;
}) => {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('metadata', 'utf-8'),
			METADATA_PROGRAM_KEY.toBuffer(),
			mint.toBuffer(),
			Buffer.from('token_record', 'utf-8'),
			token.toBuffer(),
		],
		METADATA_PROGRAM_KEY,
	);
};
