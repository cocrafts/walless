import type { FC, ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

type Props = ViewProps & {
	horizontal?: boolean;
	children: ReactNode;
};

export const SectionContainer: FC<Props> = ({
	horizontal = false,
	children,
	...viewProps
}) => {
	return (
		<View
			horizontal={horizontal}
			{...viewProps}
			style={[styles.container, viewProps.style]}
		>
			{children}
		</View>
	);
};

export default SectionContainer;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		maxWidth: 1200,
		marginHorizontal: 'auto',
		marginVertical: 60,
		paddingHorizontal: 18,
	},
});
