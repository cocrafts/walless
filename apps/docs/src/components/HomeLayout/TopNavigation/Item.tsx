import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Link from 'next/link';

interface Props {
	isActive: boolean;
	title: string;
	href: string;
}

export const NavigationItem: FC<Props> = ({ isActive, title, href }) => {
	return (
		<View style={styles.container}>
			<Link href={href} style={{ textDecorationLine: 'none' }}>
				<Text style={[styles.title, !isActive && styles.inActive]}>
					{title}
				</Text>
			</Link>
		</View>
	);
};

export default NavigationItem;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 25,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
	inActive: {
		color: '#566674',
	},
});
