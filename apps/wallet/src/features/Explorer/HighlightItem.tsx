import { View } from '@walless/gui';
import { Image, StyleSheet } from 'react-native';

const HighlightItem = () => {
	return (
		<View>
			<Image
				style={styles.image}
				source={{ uri: 'https://picsum.photos/200/300' }}
			/>
		</View>
	);
};

export default HighlightItem;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: '100%',
	},
});
