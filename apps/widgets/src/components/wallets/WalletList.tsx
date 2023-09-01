import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button, Text, View } from '@walless/gui';
import { authAction } from 'state/index';

export const WalletList = () => {
	const {
		wallets,
		select,
		connecting,
		connected,
		wallet,
		disconnect,
		publicKey,
	} = useWallet();

	const walletInfo = useMemo(() => {
		if (connecting) return `Connecting to ${wallet?.adapter.name}`;
		if (connected) return `Connected to ${wallet?.adapter.name}`;
		if (wallet) return `Pending on ${wallet?.adapter.name}...`;
		return 'No wallet selected';
	}, [connecting, connected, wallet]);

	const [laterRender, setLaterRender] = useState(false);

	useEffect(() => {
		setLaterRender(true);
	}, []);

	authAction.updatePubkey(publicKey?.toBase58() ?? '');

	const getBackground = (walletName: string) => {
		const unselectedBackground = '#202D38';
		const connectingBackground = '#FFA500';
		const connectedBackground = '#0D9494';
		const selectableBackground = '#0694D3';

		if (!wallet) return selectableBackground;

		if (walletName === wallet.adapter.name) {
			if (connected) return connectedBackground;
			if (connecting) return connectingBackground;
		}

		return unselectedBackground;
	};

	return (
		<View style={styles.container}>
			{laterRender && (
				<>
					<View style={styles.walletsContainer}>
						{wallets.map((walletItem) => (
							<Button
								key={walletItem.adapter.name}
								onPress={() => select(walletItem.adapter.name)}
								disabled={connected || connecting}
								title={walletItem.adapter.name}
								style={{
									backgroundColor: getBackground(walletItem.adapter.name),
								}}
							/>
						))}
						<Button
							onPress={disconnect}
							disabled={!wallet}
							title="Disconnect"
						/>
					</View>
					<Text style={styles.walletInfoText}>{walletInfo}</Text>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 32,
		alignItems: 'center',
	},
	walletsContainer: {
		flexDirection: 'row',
		gap: 16,
	},
	walletInfoText: {
		fontSize: 16,
		textAlign: 'center',
	},
});
