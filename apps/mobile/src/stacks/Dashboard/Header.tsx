import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

type HeaderProps = BottomTabHeaderProps & {
	title?: string;
	topInset: number;
};

const Header: FC<HeaderProps> = ({ topInset, route }) => {
	const offsetStyle: ViewStyle = {
		paddingTop: topInset,
	};

	return (
		<View style={[offsetStyle, styles.container]}>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{route.name}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#081016',
	},
	textContainer: {
		marginVertical: 16,
		marginLeft: 28,
	},
	text: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default Header;
