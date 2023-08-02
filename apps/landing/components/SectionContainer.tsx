import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

interface Props {
	horizontal?: boolean;
	style?: ViewStyle;
	children: ReactNode;
}

export const SectionContainer: FC<Props> = ({
	horizontal = false,
	style,
	children,
}) => {
	return (
		<View horizontal={horizontal} style={[{ ...styles.container, ...style }]}>
			{children}
		</View>
	);
};

export default SectionContainer;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		maxWidth: 1620,
		marginHorizontal: 'auto',
		marginVertical: 40,
		paddingHorizontal: 18,
	},
});
