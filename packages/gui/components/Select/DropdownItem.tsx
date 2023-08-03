import type { FC } from 'react';
import { useState } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Check } from '@walless/icons';

interface Props {
	selected: boolean;
	name: string;
	icon: string;
	style: StyleProp<ViewStyle>;
	iconStyle?: StyleProp<ImageStyle>;
	onPress: () => void;
}

const DropdownItem: FC<Props> = ({
	selected,
	name,
	icon,
	onPress,
	style,
	iconStyle,
}) => {
	const [isHover, setIsHover] = useState(false);
	const iconSrc = { uri: icon };

	const containerStyle = [
		styles.itemButton,
		isHover && { backgroundColor: '#1F2A34' },
		style,
	];

	return (
		<Hoverable
			onPress={onPress}
			onHoverIn={() => setIsHover(true)}
			onHoverOut={() => setIsHover(false)}
			style={containerStyle}
		>
			<Image source={iconSrc} style={[styles.icon, iconStyle]} />
			<Text style={[styles.text, isHover && { color: '#FFFFFF' }]}>{name}</Text>
			{selected && (
				<View style={styles.checkIcon}>
					<Check size={16} color="#566674" />
				</View>
			)}
		</Hoverable>
	);
};

const styles = StyleSheet.create({
	itemButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 9,
		paddingVertical: 12,
		paddingHorizontal: 7,
		borderRadius: 11,
	},
	icon: {
		width: 18,
		height: 18,
		borderRadius: 8,
	},
	text: {
		color: '#566674',
		fontSize: 14,
	},
	checkIcon: {
		marginLeft: 'auto',
	},
});

export default DropdownItem;
