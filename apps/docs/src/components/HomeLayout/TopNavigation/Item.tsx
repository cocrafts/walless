import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Anchor, Text } from '@walless/gui';

interface Props {
	isActive: boolean;
	title: string;
	href: string;
}

export const NavigationItem: FC<Props> = ({ isActive, title, href }) => {
	return (
		<Anchor style={styles.container} href={href} target="_self">
			<Text style={[styles.title, !isActive && styles.inActive]}>{title}</Text>
		</Anchor>
	);
};

export default NavigationItem;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
	inActive: {
		color: '#566674',
	},
});
