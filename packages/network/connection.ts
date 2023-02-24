import { clusterApiUrl, Connection } from '@solana/web3.js';

export default class SolanaConnection {
	private static instance: SolanaConnection;
	private connection: Connection;
	private static countGetConnection = 0;

	private constructor() {
		this.connection = new Connection(clusterApiUrl('devnet'));
	}

	public static getConnection(): Connection {
		if (!SolanaConnection.instance) {
			SolanaConnection.instance = new SolanaConnection();
		}

		SolanaConnection.countGetConnection++;
		return SolanaConnection.instance.connection;
	}

	public static getConnectionLog() {
		return {
			countConnection: SolanaConnection.countGetConnection,
		};
	}
}
