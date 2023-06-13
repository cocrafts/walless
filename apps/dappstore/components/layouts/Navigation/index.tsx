import { Image, StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';
import { resources } from 'utils/config';

import NavigationItem from './Item';

export const Navigation = () => {
	return (
		<View horizontal style={styles.container}>
			<Image source={resources.walless.horizontalLogo} style={styles.logo} />
			<View horizontal style={styles.groupItem}>
				<NavigationItem isActive={true} title="Explore" href="/explore" />
				<NavigationItem
					isActive={false}
					title="Design Tool"
					href="/design-tool"
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					title="Join waitlist"
					titleStyle={styles.buttonTitle}
				/>
			</View>
		</View>
	);
};

export default Navigation;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
	},
	logo: {
		width: 256,
		aspectRatio: 128 / 15,
	},
	groupItem: {
		justifyContent: 'center',
	},
	buttonContainer: {
		width: 256,
		alignItems: 'flex-end',
	},
	button: {
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 12,
	},
	buttonTitle: {
		fontWeight: '500',
		fontSize: 16,
	},
});
