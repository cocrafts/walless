import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedView, Text, TouchableOpacity, View } from '@walless/ui';
import { TimesIcon } from '@walless/ui/icons';
import { useSharedValue } from 'utils/hook';

interface Props {
	isConfirmPhase: boolean;
	isPasscodeIncorrect: boolean;
	handleCloseWarning: () => void;
}

export const Warning: React.FC<Props> = ({
	isConfirmPhase,
	isPasscodeIncorrect,
	handleCloseWarning,
}) => {
	const opacity = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => {
		const top = interpolate(opacity.value, [0, 1], [-40, 0], Extrapolate.CLAMP);
		return {
			opacity: opacity.value,
			top,
		};
	});

	useEffect(() => {
		opacity.value = withTiming(isConfirmPhase && isPasscodeIncorrect ? 1 : 0);
	}, [isConfirmPhase, isPasscodeIncorrect]);

	return (
		<AnimatedView style={[styles.container, animatedStyle]}>
			<View className="flex-row justify-end">
				<TouchableOpacity className="px-1" onPress={handleCloseWarning}>
					<TimesIcon size={18} color="white" />
				</TouchableOpacity>
			</View>
			<Text className="text-center text-xs">
				Please make sure your passcode is matched.
			</Text>
			<Text className="text-center text-xs">Try again!</Text>
		</AnimatedView>
	);
};

export default Warning;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		backgroundColor: '#A13E3E',
		paddingBottom: 14,
	},
});
