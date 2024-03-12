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
	hasNotification?: boolean;
	isNew?: boolean;
	onPress?: () => void;
}

export const SettingButton: FC<Props> = ({
	title,
	titleColor = '#ffffff',
	prefixIcon,
	prefixIconContainerStyle,
	suffixIcon,
	hasNotification = false,
	isNew = false,
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
					<View>
						<View style={[styles.prefixIcon, prefixIconContainerStyle]}>
							{prefixIcon}
						</View>
						{hasNotification && <View style={styles.notificationDot} />}
					</View>
				)}
				<Text style={{ color: titleColor }}>{title}</Text>
				{isNew && (
					<View style={styles.newContainer}>
						<Text style={styles.newText}>New</Text>
					</View>
				)}
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
	prefixIcon: {
		backgroundColor: '#202D38',
		width: 30,
		height: 30,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	notificationDot: {
		position: 'absolute',
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#E72828',
		top: 0,
		right: 8,
	},
	titleBlock: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	newContainer: {
		marginLeft: 8,
		backgroundColor: '#19A3E1',
		width: 40,
		height: 20,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	newText: {
		color: '#ffffff',
		fontSize: 11,
		fontWeight: '400',
	},
});
