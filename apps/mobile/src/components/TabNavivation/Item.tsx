import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { Route } from '@react-navigation/native';
import { Text } from '@walless/gui';

interface Props {
	route: Route<string, never>;
	focused: boolean;
	onNavigate: (route: Route<string, never>, focused: boolean) => void;
}

export const TabNavigationItem: FC<Props> = ({
	route,
	focused,
	onNavigate,
}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => onNavigate?.(route, focused)}
		>
			<Text style={styles.tabTitle}>{route.name}</Text>
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
});
