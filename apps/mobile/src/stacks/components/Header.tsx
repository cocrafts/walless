import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeft, Hamburger } from '@walless/icons';

interface HeaderProps {
	topInset: number;
	title: string;
	showIcon?: boolean;
	toggleDrawer?: () => void;
	goBack?: () => void;
}

const Header: FC<HeaderProps> = ({
	topInset,
	title,
	showIcon,
	toggleDrawer,
	goBack,
}) => {
	const offsetStyle: ViewStyle = {
		paddingTop: Math.max(topInset, 18),
	};

	const handlePressIcon = toggleDrawer ? toggleDrawer : goBack;
	const Icon = toggleDrawer ? Hamburger : ChevronLeft;

	return (
		<View style={[offsetStyle, styles.container]}>
			<View style={styles.textContainer}>
				{showIcon && (
					<TouchableOpacity hitSlop={16} onPress={handlePressIcon}>
						<Icon size={14} />
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
		paddingBottom: 12,
		paddingLeft: 18,
	},
	textContainer: {
		marginTop: 6,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		opacity: 0.8,
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default Header;
