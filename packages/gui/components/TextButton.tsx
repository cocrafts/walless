import { TouchableOpacity } from 'react-native';
import { setupReactNative, styled } from '@tamagui/core';

setupReactNative({
	TouchableOpacity,
});

export const TextButton = styled(TouchableOpacity, {
	backgroundColor: 'transparent',
	activeOpacity: 0.6,
	alignItems: 'center',
});
