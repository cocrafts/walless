import { Image, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export const AnimatedImage = Animated.createAnimatedComponent(Image);
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const AnimatedView = Animated.createAnimatedComponent(View);
