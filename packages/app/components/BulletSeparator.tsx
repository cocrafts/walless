import { type FC } from 'react';
import { StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { View } from '@walless/gui';

type Props = ViewProps & {
	style?: ViewStyle;
	noBullet?: boolean;
	bulletWidth?: number;
	bulletHeight?: number;
	lineHeight?: number;
	color?: string;
};

export const BulletSeparator: FC<Props> = ({
	style,
	noBullet,
	bulletWidth = 16,
	bulletHeight = 3,
	lineHeight = 1,
	color = '#19A3E1',
}) => {
	const topOffset = (lineHeight - bulletHeight) / 2;

	const styles = StyleSheet.create({
		container: {
			top: -(bulletHeight / 2),
			height: lineHeight,
			borderRadius: lineHeight / 2,
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
			...(style || {}),
		},
		bullet: {
			top: topOffset,
			width: bulletWidth,
			height: bulletHeight,
			borderRadius: bulletHeight / 2,
			backgroundColor: color,
		},
	});

	return (
		<View style={styles.container}>
			{!noBullet && <View style={styles.bullet} />}
		</View>
	);
};

export default BulletSeparator;
