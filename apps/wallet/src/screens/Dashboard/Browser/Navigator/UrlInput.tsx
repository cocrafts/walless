import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
} from 'react-native';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Search, XCircle } from '@walless/icons';
import { isValidHttpUrl, isValidUrl } from 'utils/helper';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

interface Props {
	url: string;
	onBlur: () => void;
	onSubmit?: (url: string) => void;
}

export const UrlInput: FC<Props> = ({ url, onBlur, onSubmit }) => {
	const inputRef = useRef<TextInput>();
	const opacity = useSharedValue<number>(0);
	const [innerUrl, setInnerUrl] = useState<string>(url);

	const containerStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	}, [opacity]);

	const handleBlur = () => {
		setTimeout(() => {
			if (!inputRef.current?.isFocused()) {
				onBlur?.();
			}
		}, 150);
	};

	const handleSubmit = ({
		nativeEvent,
	}: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
		const address = nativeEvent.text;
		let smartTarget = `https://google.com/search?q=${address}`;

		if (url === address) return;
		if (isValidHttpUrl(address)) {
			smartTarget = address;
			setInnerUrl(smartTarget);
		} else if (isValidUrl(address)) {
			smartTarget = `https://${address}`;
			setInnerUrl(smartTarget);
		}

		onSubmit?.(smartTarget);
	};

	const handleClear = () => {
		setInnerUrl('');
		inputRef.current?.focus();
	};

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 250 });
		setTimeout(() => inputRef.current?.focus(), 200);
	}, []);

	return (
		<Animated.View style={[styles.container, containerStyle]}>
			<Search size={15} />
			<AnimatedInput
				selectTextOnFocus
				keyboardType="url"
				returnKeyType="go"
				ref={inputRef as never}
				style={styles.input}
				value={innerUrl}
				onBlur={handleBlur}
				onSubmitEditing={handleSubmit}
				onChangeText={setInnerUrl}
			/>
			<TouchableOpacity hitSlop={16} onPress={handleClear}>
				<XCircle size={16} />
			</TouchableOpacity>
		</Animated.View>
	);
};

export default UrlInput;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		gap: 8,
	},
	input: {
		flex: 1,
		color: '#FFFFFF',
	},
});
