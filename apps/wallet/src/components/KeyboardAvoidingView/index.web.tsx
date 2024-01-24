import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

interface Props {
	children: ReactNode;
	style?: ViewStyle | ViewStyle[];
}

const KeyboardAvoidingView: FC<Props> = ({ children, style }) => {
	return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default KeyboardAvoidingView;
