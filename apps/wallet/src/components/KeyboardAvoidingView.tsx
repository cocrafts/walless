import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import {
	Keyboard,
	KeyboardAvoidingView as BaseKeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

interface Props {
	children: ReactNode;
	style?: ViewStyle | ViewStyle[];
}

const KeyboardAvoidingView: FC<Props> = ({ children, style }) => {
	if (Platform.OS === 'web') {
		return <View style={[styles.container, style]}>{children}</View>;
	}

	return (
		<BaseKeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={[styles.container, style]}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				{children}
			</TouchableWithoutFeedback>
		</BaseKeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default KeyboardAvoidingView;
