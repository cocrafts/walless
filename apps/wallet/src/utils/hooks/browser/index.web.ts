import { useSharedValue } from 'react-native-reanimated';
import { colors } from 'utils/style';

export const useWebViewProgress = () => {
	const progress = useSharedValue<number>(0);
	const backgroundColor = useSharedValue(colors.tabNavigatorBg);

	return {
		loading: false,
		progress,
		backgroundColor,
		onLoadStart: () => {},
		onLoadProgress: () => {},
		onloadEnd: async () => {},
		onMessage: () => {},
	};
};
