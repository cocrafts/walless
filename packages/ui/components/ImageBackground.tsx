import { ImageBackground as RNImageBackground } from 'react-native';
import type { GetProps } from '@tamagui/core';
import { styled } from '@tamagui/core';

export const ImageBackground = styled(RNImageBackground, {
	name: 'ImageBackground',
	source: { uri: '' },
});

export type ImageBackgroundProps = GetProps<typeof ImageBackground>;
