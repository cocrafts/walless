import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from '@walless/gui';
import { Phone, PlainWalless, Puzzle, Walless } from '@walless/icons';

import LaunchingOption from './LauchingOption';

const LaunchingModal = () => {
	return (
		<View>
			<Button title="Access Walless" style={styles.button} />
			<View style={styles.container}>
				<LaunchingOption
					icon={<PlainWalless color="#A4B3C1" />}
					title="Launch web app"
					activeIcon={<Walless />}
					url="https://app.walless.io/auth/invitation"
				/>
				<View style={styles.line} />
				<LaunchingOption
					icon={<Puzzle color="#A4B3C1" />}
					title="Add extension"
					activeIcon={<Puzzle color="#19A3E1" />}
					url="https://chromewebstore.google.com/detail/walless/jfmajkmgjpjognffefopllhaijknhnmm"
				/>
				<LaunchingOption
					icon={<Phone color="#A4B3C1" />}
					title="Mobile (coming soon)"
					isDisabled={true}
					activeIcon={<Phone color="#19A3E1" />}
				/>
			</View>
		</View>
	);
};

export default LaunchingModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#19232C',
		borderRadius: 16,
		paddingVertical: 12,
		paddingHorizontal: 16,
		gap: 8,
	},
	button: {
		marginHorizontal: 8,
		alignSelf: 'flex-start',
	},
	line: {
		backgroundColor: '#ffffff',
		height: 1,
		opacity: 0.1,
	},
});
