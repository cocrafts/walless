import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Hamburger } from '@walless/icons';

interface HeaderProps {
	topInset: number;
	title: string;
	showMenu?: boolean;
	toggleDrawer?: () => void;
}

const Header: FC<HeaderProps> = ({
	topInset,
	title,
	showMenu,
	toggleDrawer,
}) => {
	const offsetStyle: ViewStyle = {
		paddingTop: topInset,
	};

	return (
		<View style={[offsetStyle, styles.container]}>
			<View style={styles.textContainer}>
				{showMenu && (
					<TouchableOpacity onPress={toggleDrawer}>
						<Hamburger size={20} />
					</TouchableOpacity>
				)}
				<Text style={styles.text}>{title}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#081016',
	},
	textContainer: {
		marginTop: 16,
		marginBottom: 24,
		marginLeft: 28,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
	},
	text: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default Header;
