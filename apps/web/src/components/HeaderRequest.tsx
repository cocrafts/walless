import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ChevronDown } from '@walless/icons';

export const HeaderRequest = () => {
	const iconSrc = { uri: '/img/bare-icon.png' };

	return (
		<View style={styles.container}>
			<Image style={styles.icon} source={iconSrc} />
			<View style={styles.infoContainer}>
				<Text style={styles.title}>Zbz thic...</Text>
				<Hoverable style={styles.button}>
					<ChevronDown size={20} />
				</Hoverable>
			</View>
			<View style={styles.emptyView} />
		</View>
	);
};

const iconWidth = 40;
const iconHeight = iconWidth / 2;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#121B22',
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	icon: {
		width: iconWidth,
		height: iconHeight,
	},
	infoContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontWeight: '300',
		textAlign: 'center',
	},
	emptyView: {
		width: iconWidth,
	},
	button: {
		padding: 5,
	},
});
