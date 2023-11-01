import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { Route } from '@react-navigation/native';
import { Text } from '@walless/gui';

interface Props {
	route: Route<string, never>;
	focused: boolean;
	tabIcon?: ImageSourcePropType;
	onNavigate: (route: Route<string, never>, focused: boolean) => void;
}

export const TabNavigationItem: FC<Props> = ({
	route,
	focused,
	tabIcon,
	onNavigate,
}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => onNavigate?.(route, focused)}
		>
			{tabIcon ? (
				<Image
					source={tabIcon}
					resizeMode="contain"
					style={[styles.icon, focused && styles.iconActive]}
				/>
			) : (
				<Text style={styles.tabTitle}>{route.name}</Text>
			)}
		</TouchableOpacity>
	);
};

export default TabNavigationItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabTitle: {
		textAlign: 'right',
	},
	icon: {
		borderRadius: 1000,
		height: 32,
		aspectRatio: 1,
		opacity: 0.5,
	},
	iconActive: {
		opacity: 1,
	},
});
