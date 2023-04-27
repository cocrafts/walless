import { type FC, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Hoverable, Text } from '@walless/gui';

interface Props {
	selected: boolean;
	name: string;
	icon: string;
	onPress: () => void;
}

const DropdownItem: FC<Props> = ({ name, icon, onPress }) => {
	const [isHover, setIsHover] = useState(false);
	const iconSrc = { uri: icon };

	const containerStyle = [
		styles.itemButton,
		isHover && { backgroundColor: '#1F2A34' },
	];

	return (
		<Hoverable
			onPress={onPress}
			onHoverIn={() => setIsHover(true)}
			onHoverOut={() => setIsHover(false)}
			style={containerStyle}
		>
			<Image source={iconSrc} style={styles.icon} />
			<Text>{name}</Text>
		</Hoverable>
	);
};

const styles = StyleSheet.create({
	itemButton: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 320,
		height: 40,
		borderRadius: 11,
		paddingHorizontal: 16,
	},
	icon: {
		width: 16,
		height: 16,
		borderRadius: 8,
	},
});

export default DropdownItem;
