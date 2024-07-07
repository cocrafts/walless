import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Anchor, Text } from '@walless/gui';

interface LauchingOptionProps {
	icon: ReactNode;
	title: string;
	activeIcon: ReactNode;
	onPress?: () => void;
	url?: string;
	isDisabled?: boolean;
}

const LaunchingOption: FC<LauchingOptionProps> = ({
	icon,
	activeIcon,
	title,
	onPress,
	url,
	isDisabled = false,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleHoverIn = () => {
		setIsHovered(true);
	};

	const handleHoverOut = () => {
		setIsHovered(false);
	};

	return (
		<Anchor
			onHoverIn={handleHoverIn}
			onHoverOut={handleHoverOut}
			href={url as string}
			hoverOpacity={1}
			disabled={isDisabled}
		>
			<TouchableOpacity
				style={[
					styles.container,
					isHovered && !isDisabled && styles.hoveredContainerStyle,
				]}
				onPress={onPress}
				disabled={isDisabled}
			>
				{isHovered && !isDisabled ? activeIcon : icon}
				<Text
					style={[
						styles.title,
						isHovered && !isDisabled && styles.hoveredTextStyle,
					]}
				>
					{title}
				</Text>
			</TouchableOpacity>
		</Anchor>
	);
};

export default LaunchingOption;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
		borderRadius: 8,
		gap: 8,
		width: 186,
		paddingVertical: 8,
		paddingHorizontal: 8,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	title: {
		color: '#ffffff',
	},
	hoveredContainerStyle: {
		backgroundColor: '#202D38',
		borderColor: '#000000',
	},
	hoveredTextStyle: { fontWeight: '500' },
});
