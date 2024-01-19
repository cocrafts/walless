import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FingerPrint, ScanFace } from '@walless/icons';
import type { BiometricStatus } from 'utils/hooks';

interface Props {
	status: BiometricStatus;
	onPress?: () => void;
}

export const BiometricIcon: FC<Props> = ({ status, onPress }) => {
	const IconComponent = status.isFingerPrint ? FingerPrint : ScanFace;

	return (
		<TouchableOpacity
			disabled={!onPress}
			style={styles.container}
			onPress={onPress}
		>
			<IconComponent size={38} />
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
