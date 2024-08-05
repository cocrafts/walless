import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@walless/gui';
import { sharedStyles } from 'utils/style';

interface Props {
	style?: ViewStyle;
	text: string;
}

const LoadingText: FC<Props> = ({ style, text }) => {
	return (
		<View style={[sharedStyles.flexRow, sharedStyles.gap8, style]}>
			<ActivityIndicator />
			<Text>{text}</Text>
		</View>
	);
};

export default LoadingText;
