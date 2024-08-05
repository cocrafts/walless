import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Text } from '@walless/gui';
import { sharedStyles } from 'utils/style';

interface Props {
	style?: ViewStyle;
	title: string;
	errorText: string;
}

const ErrorText: FC<Props> = ({ style, title, errorText }) => {
	return (
		<View style={[style]}>
			<Text style={sharedStyles.textError}>{title}</Text>
			<Text style={sharedStyles.fontSize13}>{errorText}</Text>
		</View>
	);
};

export default ErrorText;
