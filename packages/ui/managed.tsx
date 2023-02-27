import {
	Image as BareImage,
	Text as BareText,
	TouchableOpacity as BareTouchableOpacity,
	View as BareView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { styled } from 'nativewind';

export const View = styled(BareView);
export const Text = styled(BareText, 'font-poppins text-white');
export const TextBlack = styled(BareText, 'font-poppins text-black');
export const Image = styled(BareImage);
export const TouchableOpacity = styled(BareTouchableOpacity);

export const AnimatedView = Animated.createAnimatedComponent(View);
export const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
export const AnimatedImage = Animated.createAnimatedComponent(Image);
