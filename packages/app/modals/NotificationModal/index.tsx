import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { ModalConfigs } from '@walless/gui';
import { Text, View } from '@walless/gui';

interface ModalContext {
	prefix?: FC;
	message: string;
	suffix?: FC;
}

interface Props {
	config: ModalConfigs;
}

export const NotificationModal: FC<Props> = ({ config }) => {
	const { context } = config;
	const {
		prefix: PrefixComponent,
		message,
		suffix: SuffixComponent,
	} = context as ModalContext;

	return (
		<View horizontal style={styles.container}>
			{PrefixComponent && <PrefixComponent />}
			<Text style={styles.title}>{message}</Text>
			{SuffixComponent && <SuffixComponent />}
		</View>
	);
};

export default NotificationModal;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#43525F',
		borderRadius: 60,
		paddingVertical: 15,
		paddingHorizontal: 30,
		gap: 8,
	},
	title: {
		fontWeight: '500',
	},
});
