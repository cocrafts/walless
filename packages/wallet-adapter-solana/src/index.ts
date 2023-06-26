import {
	type EventEmitter,
	type SupportedTransactionVersions,
	type TransactionOrVersionedTransaction,
	type WalletName,
	BaseMessageSignerWalletAdapter,
	scopePollingDetectionStrategy,
	WalletAccountError,
	WalletConnectionError,
	WalletDisconnectedError,
	WalletDisconnectionError,
	WalletNotConnectedError,
	WalletNotReadyError,
	WalletPublicKeyError,
	WalletReadyState,
	WalletSignMessageError,
	WalletSignTransactionError,
} from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';

interface WallessWalletEvents {
	connect(...args: unknown[]): unknown;
	disconnect(...args: unknown[]): unknown;
	accountChanged(newPublicKey: PublicKey): unknown;
}

interface WallessWallet extends EventEmitter<WallessWalletEvents> {
	isWalless?: boolean;
	publicKey?: { toBytes(): Uint8Array };
	isConnected: boolean;
	signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
	signTransaction<
		T extends TransactionOrVersionedTransaction<SupportedTransactionVersions>,
	>(
		transaction: T,
	): Promise<T>;
	signAllTransactions<
		T extends TransactionOrVersionedTransaction<SupportedTransactionVersions>,
	>(
		transactions: T[],
	): Promise<T[]>;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
}

interface WallessWindow extends Window {
	walless?: WallessWallet;
}

declare const window: WallessWindow;

export const WallessWalletName = 'Walless' as WalletName<'Walless'>;
export class WallessWalletAdapter extends BaseMessageSignerWalletAdapter {
	name = WallessWalletName;
	url = 'https://walless.io/';
	icon =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACE4AAAhOAFFljFgAAAFw2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDItMjFUMjI6Mjc6MDcrMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTAyLTIxVDIyOjI5OjE1KzA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTAyLTIxVDIyOjI5OjE1KzA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmNWZhNmQ5Ny1jYjQ3LTRiMjctYjJiOC01MjUyYzhiOTExMTkiIHhtcE1NOkRvY3VtZW50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';
	readonly supportedTransactionVersions: SupportedTransactionVersions | null =
		null;

	private _connecting: boolean;
	private _wallet: WallessWallet | null;
	private _publicKey: PublicKey | null;
	private _readyState: WalletReadyState =
		typeof window === 'undefined' || typeof document === 'undefined'
			? WalletReadyState.Unsupported
			: WalletReadyState.NotDetected;

	constructor() {
		super();
		this._connecting = false;
		this._wallet = null;
		this._publicKey = null;

		if (this._readyState !== WalletReadyState.Unsupported) {
			scopePollingDetectionStrategy(() => {
				if (window.walless?.isWalless) {
					this._readyState = WalletReadyState.Installed;
					this.emit('readyStateChange', this._readyState);
					return true;
				}
				return false;
			});
		}
	}

	get publicKey() {
		return this._publicKey;
	}

	get connecting() {
		return this._connecting;
	}

	get connected() {
		return !!this._wallet?.isConnected;
	}

	get readyState() {
		return this._readyState;
	}

	async connect(): Promise<void> {
		try {
			if (this.connected || this.connecting) return;
			if (this._readyState !== WalletReadyState.Installed)
				throw new WalletNotReadyError();

			this._connecting = true;

			const wallet = window.walless;

			try {
				await wallet?.connect();
			} catch (error) {
				throw new WalletConnectionError(error?.message, error);
			}

			if (!wallet?.publicKey) throw new WalletAccountError();

			let publicKey: PublicKey;
			try {
				publicKey = new PublicKey(wallet.publicKey.toBytes());
			} catch (error) {
				throw new WalletPublicKeyError(error?.message, error);
			}

			wallet.on('disconnect', this._disconnected);

			this._wallet = wallet;
			this._publicKey = publicKey;

			this.emit('connect', publicKey);
		} catch (error) {
			this.emit('error', error);
			throw error;
		} finally {
			this._connecting = false;
		}
	}

	async disconnect(): Promise<void> {
		const wallet = this._wallet;
		if (wallet) {
			wallet.off('disconnect', this._disconnected);

			this._wallet = null;
			this._publicKey = null;

			try {
				await wallet.disconnect();
			} catch (error) {
				this.emit('error', new WalletDisconnectionError(error?.message, error));
			}
		}

		this.emit('disconnect');
	}

	async signMessage(message: Uint8Array): Promise<Uint8Array> {
		try {
			const wallet = this._wallet;
			if (!wallet) throw new WalletNotConnectedError();

			try {
				const { signature } = await wallet.signMessage(message);
				return signature;
			} catch (error) {
				throw new WalletSignMessageError(error?.message, error);
			}
		} catch (error) {
			this.emit('error', error);
			throw error;
		}
	}

	async signTransaction<
		T extends TransactionOrVersionedTransaction<SupportedTransactionVersions>,
	>(transaction: T): Promise<T> {
		try {
			const wallet = this._wallet;
			if (!wallet) throw new WalletNotConnectedError();

			try {
				return (await wallet.signTransaction(transaction)) || transaction;
			} catch (error) {
				throw new WalletSignTransactionError(error?.message, error);
			}
		} catch (error) {
			this.emit('error', error);
			throw error;
		}
	}

	async signAllTransactions<
		T extends TransactionOrVersionedTransaction<SupportedTransactionVersions>,
	>(transactions: T[]): Promise<T[]> {
		try {
			const wallet = this._wallet;
			if (!wallet) throw new WalletNotConnectedError();

			try {
				return (await wallet.signAllTransactions(transactions)) || transactions;
			} catch (error) {
				throw new WalletSignTransactionError(error?.message, error);
			}
		} catch (error) {
			this.emit('error', error);
			throw error;
		}
	}

	private _disconnected = () => {
		const wallet = this._wallet;
		if (wallet) {
			wallet.off('disconnect', this._disconnected);

			this._wallet = null;
			this._publicKey = null;

			this.emit('error', new WalletDisconnectedError());
			this.emit('disconnect');
		}
	};
}
