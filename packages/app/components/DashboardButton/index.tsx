import { type FC, type ReactNode } from 'react';
import { type ViewStyle, StyleSheet } from 'react-native';
import { Hoverable, View } from '@walless/gui';

import { ActiveHighlight } from './ActiveHighlight';

interface Props {
	size?: number;
	isActive?: boolean;
	activeStyle?: ViewStyle;
	children?: ReactNode;
	onPress?: () => void;
}

export const DashboardButton: FC<Props> = ({
	size = 36,
	isActive = false,
	activeStyle,
	children,
}) => {
	const buttonStyle: ViewStyle = {
		width: size,
		height: size,
		borderRadius: 10,
		backgroundColor: isActive ? '#0694D3' : '#243F56',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	};

	return (
		<View style={styles.container}>
			{isActive && <ActiveHighlight />}
			<Hoverable style={[buttonStyle, isActive && activeStyle]}>
				{children}
			</Hoverable>
		</View>
	);
};

export default DashboardButton;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
});
