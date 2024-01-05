import type { FC } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ModalConfigs } from '@walless/gui';
import { Text } from '@walless/gui';

export interface NotificationModalContext {
	id: string;
	message: string;
	textStyle?: StyleProp<TextStyle>;
	prefix?: FC;
	suffix?: FC;
	timeout?: number;
}

interface Props {
	config: ModalConfigs;
}

export const NotificationModal: FC<Props> = ({ config }) => {
	const insets = useSafeAreaInsets();
	const {
		message,
		textStyle,
		prefix: PrefixComponent,
		suffix: SuffixComponent,
	} = config.context as NotificationModalContext;
	const containerStyle: ViewStyle = {
		marginTop: insets.top,
	};

	return (
		<View style={[styles.container, containerStyle]}>
			{PrefixComponent && <PrefixComponent />}
			<Text style={textStyle}>{message}</Text>
			{SuffixComponent && <SuffixComponent />}
		</View>
	);
};

export default NotificationModal;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#43525F',
		borderRadius: 60,
		paddingVertical: 16,
		paddingHorizontal: 20,
		gap: 8,
	},
});
