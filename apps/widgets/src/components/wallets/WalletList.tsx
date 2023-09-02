import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button, View } from '@walless/gui';
import { appState, authAction, widgetAction } from 'state/index';
import { useSnapshot } from 'valtio';

export const WalletList = () => {
	const { wallets, select, wallet, signMessage } = useWallet();
	const { authenticated } = useSnapshot(appState.auth);

	const connectStatus = useMemo(() => {
		if (!wallet) return '';
		if (wallet.adapter.connected) return `Connected to ${wallet.adapter.name}`;
		return `Connecting to ${wallet.adapter.name}...`;
	}, [wallet?.adapter.connecting, wallet?.adapter.connected]);

	const getBackground = (walletName: string) => {
		const unselectedBackground = '#202D38';
		const connectingBackground = '#FFA500';
		const connectedBackground = '#0D9494';
		const selectableBackground = '#0694D3';

		if (!wallet) return selectableBackground;

		if (walletName === wallet.adapter.name) {
			if (wallet.adapter.connected) return connectedBackground;
			return connectingBackground;
		}

		return unselectedBackground;
	};

	const handleConnectAndSignIn = async () => {
		if (!wallet || !wallet.adapter.publicKey || !signMessage) return;
		try {
			const message: Uint8Array = new TextEncoder().encode('Hello world');
			const signature = await signMessage(message);
			authAction.handleSignIn(wallet.adapter.publicKey.toBase58(), signature);
			widgetAction.fetchWidgets();
		} catch (error) {
			wallet.adapter.disconnect();
		}
	};

	const handleDisconnect = () => {
		wallet?.adapter.disconnect();
		authAction.handleSignOut();
		widgetAction.fetchWidgets();
	};

	useEffect(() => {
		handleConnectAndSignIn();
	}, [wallet?.adapter.publicKey]);

	const [laterRender, setLaterRender] = useState(false);

	useEffect(() => {
		setLaterRender(true);
	}, []);

	if (!laterRender) return null;

	return (
		<View style={styles.container}>
			{!authenticated &&
				wallets.map((walletItem) => (
					<Button
						key={walletItem.adapter.name}
						onPress={() => select(walletItem.adapter.name)}
						disabled={wallet?.adapter.connected || wallet?.adapter.connecting}
						title={
							walletItem?.adapter.name === wallet?.adapter.name
								? connectStatus
								: walletItem.adapter.name
						}
						style={{
							backgroundColor: getBackground(walletItem.adapter.name),
						}}
					/>
				))}

			{authenticated && (
				<Button
					title={'Logout'}
					style={{
						backgroundColor: '#F04438',
					}}
					onPress={handleDisconnect}
				/>
			)}

			{!authenticated && wallet && (
				<Button onPress={handleDisconnect} title="Disconnect" />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 16,
	},
	walletInfoText: {
		fontSize: 16,
		textAlign: 'center',
	},
});
