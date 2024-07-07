import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Logo from 'components/Logo';

interface Props {
	logoSize?: number;
}
const SignInHeader: FC<Props> = ({ logoSize }) => {
	return (
		<View style={styles.container}>
			<Logo size={logoSize} />
			<Text style={styles.title}>Sign in to continue</Text>
		</View>
	);
};

export default SignInHeader;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 48,
		gap: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: '400',
	},
});
