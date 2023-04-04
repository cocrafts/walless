import { TouchableOpacity } from 'react-native';
import { setupReactNative, styled } from '@tamagui/core';

setupReactNative({
	TouchableOpacity,
});

export const SolidButton = styled(TouchableOpacity, {
	variants: {
		disabled: {
			true: {
				backgroundColor: '#202D38',
			},
		},
	} as const,
	backgroundColor: '#0694D3',
	alignItems: 'center',
	activeOpacity: 0.6,
	borderRadius: 15,
	paddingVertical: 10,
	paddingHorizontal: 20,
});
