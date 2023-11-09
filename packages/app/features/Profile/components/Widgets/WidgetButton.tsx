import type { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable } from '@walless/gui';

interface Props {
	children: ReactNode;
	onClick?: () => void;
}

const WidgetButton: FC<Props> = ({ children, onClick }) => {
	return (
		<Hoverable style={styles.button} onPress={onClick}>
			{children}
		</Hoverable>
	);
};

export default WidgetButton;

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#25313D',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		width: 30,
		height: 30,
	},
});
