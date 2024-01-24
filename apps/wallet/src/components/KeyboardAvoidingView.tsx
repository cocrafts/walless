import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import {
	Keyboard,
	KeyboardAvoidingView as BaseKeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';

interface Props {
	children: ReactNode;
	style?: ViewStyle | ViewStyle[];
}

const KeyboardAvoidingView: FC<Props> = ({ children, style }) => {
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
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
	},
});

export default KeyboardAvoidingView;
