import {
	Image as BareImage,
	Text as BareText,
	TouchableOpacity as BareTouchableOpacity,
	View as BareView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { styled } from 'nativewind';

export const View = styled(BareView);
export const Text = styled(BareText);
export const Image = styled(BareImage);
export const TouchableOpacity = styled(BareTouchableOpacity);

export const AnimatedView = Animated.createAnimatedComponent(BareView);
export const AnimatedImage = Animated.createAnimatedComponent(BareImage);
