import type { FC, ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';

interface Props {
	children?: ReactNode;
	size?: number;
	title?: string;
	titleStyle?: TextStyle;
	onPress?: () => void;
}

export const FeatureButton: FC<Props> = ({
	children,
	size = 38,
	title,
	titleStyle,
	onPress,
}) => {
	const innerStyle: ViewStyle = {
		width: size,
		height: size,
		borderRadius: 12,
		gap: 8,
		backgroundColor: onPress ? '#0694D3' : '#43525F',
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<View noSelect style={styles.container}>
			<Hoverable style={innerStyle} onPress={onPress} disabled={!onPress}>
				{children}
			</Hoverable>
			{title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
		</View>
	);
};

export default FeatureButton;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	innerContainer: {
		borderRadius: 12,
	},
	title: {
		color: '#4e5e6b',
		fontSize: 13,
		fontWeight: '400',
		marginTop: 8,
	},
});
