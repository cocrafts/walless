import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

const Separator: FC = () => {
	return (
		<View style={styles.container}>
			<View style={styles.inner} />
		</View>
	);
};

export default Separator;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		paddingHorizontal: 12,
	},
	inner: {
		width: '100%',
		height: 1,
		backgroundColor: '#566674',
		opacity: 0.4,
	},
});
