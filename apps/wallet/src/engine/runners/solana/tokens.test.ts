import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(
	process.env.SOLANA_CLUSTER_URL || clusterApiUrl('devnet'),
);

const wallet = new PublicKey('H9d4gR9nG6G7bMZLfUF5cR8MuP4wMXNwsJyPfHbeVicP');

describe('[solana runner] tokens', () => {
	test('get ATA', async () => {
		const accounts = await connection.getParsedTokenAccountsByOwner(
			wallet,
			{ programId: TOKEN_PROGRAM_ID },
			'confirmed',
		);

		accounts.value.map((ele) => {
			expect(ele.account.data.parsed.info).not.toBeNull();
		});
	});
});
