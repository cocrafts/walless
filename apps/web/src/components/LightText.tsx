import type { FC, ReactNode } from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from '@walless/gui';

interface Props extends TextStyle {
	children: ReactNode;
}

export const LightText: FC<Props> = ({ children, ...props }) => {
	return (
		<Text style={styles.text} {...props}>
			{children}
		</Text>
	);
};

export default LightText;

const styles = StyleSheet.create({
	text: {
		fontWeight: '500',
		color: '#566674',
	},
});
