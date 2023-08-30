import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputFocusEventData,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Hoverable, Input, Text, View } from '@walless/gui';

interface Props {
	title: string;
	placeholder: string;
	text: string;
	prefix?: ReactNode;
	onChangeText: (text: string) => void;
	onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	error?: string;
}

const FormInput: FC<Props> = ({
	title,
	placeholder,
	text,
	onChangeText,
	error,
	onFocus,
	onBlur,
	prefix,
}) => {
	const borderColor = useSharedValue('transparent');

	const handleHoverIn = () => {
		borderColor.value = '#566674';
	};

	const handleHoverOut = () => {
		console.log('hover out: ', error);
		if (error !== '') borderColor.value = '#E34237';
		else borderColor.value = 'transparent';
	};

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		console.log('focus: ', error);

		if (onFocus) onFocus(e);
		borderColor.value = '#566674';
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		console.log('blur: ', error);

		if (onBlur) onBlur(e);
		if (error !== '') borderColor.value = '#E34237';
		else borderColor.value = 'transparent';
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			borderColor: borderColor.value,
		};
	}, [borderColor]);

	useEffect(() => {
		if (error !== '') {
			borderColor.value = '#E34237';
		} else {
			borderColor.value = 'transparent';
		}
	}, [error]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Hoverable
				horizontal
				style={[styles.wrapContainer, animatedStyle]}
				onHoverIn={handleHoverIn}
				onHoverOut={handleHoverOut}
			>
				{prefix}
				<Input
					value={text}
					inputStyle={styles.input}
					style={styles.inputContainer}
					placeholder={placeholder}
					onChangeText={(text) => onChangeText(text)}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</Hoverable>

			<Text style={styles.error}>{error}</Text>
		</View>
	);
};

export default FormInput;

const styles = StyleSheet.create({
	container: {
		gap: 6,
	},
	title: {
		color: '#566674',
	},
	wrapContainer: {
		paddingLeft: 15,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 15,
		backgroundColor: '#0E141A',
		alignItems: 'center',
	},
	inputContainer: {
		flex: 1,
		borderWidth: 0,
	},
	input: {
		fontFamily: 'Rubik',
		paddingLeft: 0,
	},
	error: {
		marginLeft: 'auto',
		color: '#F04438',
		lineHeight: 14,
		height: 14,
	},
});
