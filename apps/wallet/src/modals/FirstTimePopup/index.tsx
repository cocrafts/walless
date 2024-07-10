import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { modalActions, Text } from '@walless/gui';
import { ModalId } from 'modals/types';
import { mockWidgets } from 'state/widget';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

import BlueCircleBackground from './BlueCircleBackground';
import PixeverseCard from './PixeverseCard';

const FirstTimePopup = () => {
	const pixeverseWidget = mockWidgets.find((item) => item._id === 'pixeverse');

	const handleAddPixeverse = () => {
		if (!pixeverseWidget) return;

		addWidgetToStorage('pixeverse', pixeverseWidget);
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Widget',
				params: {
					id: 'pixeverse',
				},
			},
		});
		modalActions.destroy(ModalId.FirstTimePopup);
	};

	return (
		<View style={styles.container}>
			<View style={styles.upperPart}>
				<View style={styles.backgroundImage}>
					<BlueCircleBackground />
				</View>

				<PixeverseCard />
			</View>

			<View style={styles.lowerPart}>
				<Text style={styles.title}>Welcome to Walless</Text>

				<View style={styles.textContainer}>
					<Text style={styles.text}>
						Lets get you set up with a brand new way of Web3 wallet. From the
						Explorer tab, you can find the best of web3: gaming, multi-chain
						wallets, trading tools,…
					</Text>
					<Text style={styles.text}>
						To start earning daily tokens, add the in-wallet game PIXEVERSE and
						the wallet widget.
					</Text>
				</View>

				<TouchableOpacity onPress={handleAddPixeverse} style={styles.addButton}>
					<Text style={styles.buttonText}>Add Pixeverse</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		maxWidth: 374,
		borderRadius: 16,
		overflow: 'hidden',
	},
	upperPart: {
		backgroundColor: '#031821',
		paddingHorizontal: 52,
		paddingVertical: 36,
		alignItems: 'center',
	},
	backgroundImage: {
		position: 'absolute',
		top: 0,
	},
	addButton: {
		backgroundColor: '#198CCA',
		paddingHorizontal: 16,
		paddingVertical: 4,
		borderColor: '#17A3E1',
		borderWidth: 1,
		borderRadius: 8,
		width: 'fit-content',
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: '500',
	},
	lowerPart: {
		gap: 20,
		backgroundColor: '#222F37',
		paddingHorizontal: 24,
		paddingVertical: 24,
		alignItems: 'center',
	},
	title: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: '500',
	},
	textContainer: {
		gap: 12,
	},
	text: {
		color: '#ffffff',
	},
});

export default FirstTimePopup;

export const showFirstTimePopup = () => {
	modalActions.show({
		id: ModalId.FirstTimePopup,
		component: FirstTimePopup,
		fullWidth: false,
	});
};
