import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@walless/gui';
import type { IconProps } from '@walless/icons';
import { sharedStyles } from 'utils/style';

import { iconSize } from '../constants';

interface Props {
	style?: ViewStyle;
	Icon: FC<IconProps>;
	iconColor: string;
	title: string;
	value: string;
	disable?: boolean;
	onPress?: () => void;
}

const InfoCard: FC<Props> = ({
	style,
	Icon,
	iconColor,
	title,
	value,
	disable,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			containerStyle={style}
			onPress={onPress}
			disabled={!onPress || disable}
		>
			<View style={[styles.iconContainer, { borderColor: iconColor }]}>
				{<Icon size={12} color={iconColor} />}
			</View>
			<View style={styles.textContainer}>
				<Text style={[sharedStyles.fontSize13, sharedStyles.textNeutral5]}>
					{title}
				</Text>
				<Text>{value}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default InfoCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#212B35',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	iconContainer: {
		width: iconSize,
		height: iconSize,
		borderRadius: iconSize / 2,
		borderWidth: 1,
		...sharedStyles.flexCenter,
	},
	textContainer: {
		gap: 2,
	},
});
