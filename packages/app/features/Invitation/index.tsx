import { type FC } from 'react';
import { type StyleProp, type ViewStyle, StyleSheet } from 'react-native';
import { Input, View } from '@walless/gui';

interface Props {
	containerStyle?: StyleProp<ViewStyle>;
	onInvitationCodeChange?: (value: string) => void;
}

export const InvitationFeature: FC<Props> = ({
	containerStyle,
	onInvitationCodeChange,
}) => {
	return (
		<View style={[styles.container, containerStyle]}>
			<Input maxLength={8} onChangeText={onInvitationCodeChange} />
		</View>
	);
};

export default InvitationFeature;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
});
