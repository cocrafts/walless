import { StyleSheet } from 'react-native';
import { Anchor, dimensionState, Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

const BottomPart = () => {
	const { isMobile } = useSnapshot(dimensionState);

	return (
		<View style={isMobile ? styles.containerMobile : styles.containerDesktop}>
			<Text>Copyright @ 2023. All rights reserved.</Text>
			<View>
				<Anchor title="Terms & Conditions" href="/" />
				<Anchor
					title="Privacy Policy"
					href="https://walless.io/privacy-policy"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containerMobile: {
		flexDirection: 'column-reverse',
	},
	containerDesktop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default BottomPart;
