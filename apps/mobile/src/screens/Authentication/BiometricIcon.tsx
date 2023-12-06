import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { BiometricStatus } from 'utils/hooks';

interface Props {
	status: BiometricStatus;
}

export const BiometricIcon: FC<Props> = () => {
	return (
		<TouchableOpacity style={styles.container}>
			<Text style={{ color: 'white' }}>BiometricIcon</Text>
		</TouchableOpacity>
	);
};

export default BiometricIcon;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: 32,
	},
});
