import {
	Image as BareImage,
	Text as BareText,
	TextInput as BareTextInput,
	TouchableOpacity as BareTouchableOpacity,
	View as BareView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Svg as BareSvg } from 'react-native-svg';
import { styled } from 'nativewind';

export const View = styled(BareView);
export const Text = styled(BareText, 'font-poppins text-white');
export const Image = styled(BareImage);
export const TouchableOpacity = styled(BareTouchableOpacity);
export const Svg = styled(BareSvg);
export const TextInput = styled(BareTextInput);

export const AnimatedView = Animated.createAnimatedComponent(View);
export const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
export const AnimatedImage = Animated.createAnimatedComponent(Image);
