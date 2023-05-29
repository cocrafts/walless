import { type FC } from 'react';
import { type ImageSourcePropType, Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	logoSrc: ImageSourcePropType;
	logoSize?: number;
}
const SignInHeader: FC<Props> = ({ logoSrc, logoSize }) => {
	const logoStyle = {
		width: logoSize,
		height: logoSize,
	};
	return (
		<View style={styles.container}>
			<Image style={logoStyle} source={logoSrc} resizeMode="cover" />
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
	},
	title: {
		fontSize: 20,
		fontWeight: '400',
	},
});
