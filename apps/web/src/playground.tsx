import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { PasscodeFeature } from '@walless/app';
import { View } from '@walless/gui';

export const AppContainer: FC = () => {
	const handlePinChange = (pin: string, isCompleted?: boolean) => {
		if (isCompleted) {
			console.log(pin, '<<---');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<PasscodeFeature onPasscodeChange={handlePinChange} />
			</View>
		</View>
	);
};

export default AppContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		width: 410,
		height: 600,
		borderRadius: 12,
		backgroundColor: '#19232c',
		overflow: 'hidden',
	},
});
