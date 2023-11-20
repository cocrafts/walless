import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

export const TRexRunner = () => {
	return (
		<View style={styles.container}>
			<iframe
				src="https://cdn.stormgate.io/documents/runner/index.html"
				width={352}
				height={300}
				style={{ borderColor: 'transparent' }}
			/>
		</View>
	);
};

export default TRexRunner;

const styles = StyleSheet.create({
	container: {
		width: 352,
		height: 600,
		justifyContent: 'center',
	},
});
