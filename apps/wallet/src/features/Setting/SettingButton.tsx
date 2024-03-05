import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';

interface Props {
	title: string;
	titleColor?: string;
	prefixIcon?: ReactNode;
	prefixIconContainerStyle?: ViewStyle;
	suffixIcon?: ReactNode;
	onPress?: () => void;
}

export const SettingButton: FC<Props> = ({
	title,
	titleColor,
	prefixIcon,
	prefixIconContainerStyle,
	suffixIcon,
	onPress,
}) => {
	const [onHover, setOnHover] = useState(false);
	const hoverStyle: ViewStyle = {
		backgroundColor: '#202D38',
	};

	return (
		<Hoverable
			style={[styles.container, onHover && hoverStyle]}
			onHoverIn={() => setOnHover(true)}
			onHoverOut={() => setOnHover(false)}
			onPress={onPress}
		>
			<View style={styles.titleBlock}>
				{prefixIcon && (
					<View style={[styles.icon, prefixIconContainerStyle]}>
						{prefixIcon}
					</View>
				)}
				<Text style={{ color: titleColor }}>{title}</Text>
			</View>

			{suffixIcon}
		</Hoverable>
	);
};

export default SettingButton;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'transparent',
		padding: 12,
		borderRadius: 14,
	},
	titleBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	icon: {
		backgroundColor: '#202D38',
		width: 30,
		height: 30,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
