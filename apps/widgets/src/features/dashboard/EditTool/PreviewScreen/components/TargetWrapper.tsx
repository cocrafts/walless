import type { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

interface Props {
	children: ReactNode;
	highlighted: boolean;
	zIndex?: number;
}

const HighlightWrapper: FC<Props> = ({ children, highlighted }) => {
	return (
		<View>
			{highlighted && <View style={styles.highlighted} />}
			{children}
		</View>
	);
};

export default HighlightWrapper;

const styles = StyleSheet.create({
	highlighted: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		borderRadius: 8,
		backgroundColor: 'rgb(6, 148, 211, 0.7)',
	},
});
