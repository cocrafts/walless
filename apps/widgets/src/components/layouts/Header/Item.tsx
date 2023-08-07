import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Link from 'next/link';

import { type NavigationItemProps } from '.';

interface Props {
	isActive: boolean;
	item: NavigationItemProps;
}

export const NavigationItem: FC<Props> = ({ isActive, item }) => {
	return (
		<View style={styles.container}>
			<Link href={item.href} style={{ textDecorationLine: 'none' }}>
				<Text style={[styles.title, !isActive && styles.inActive]}>
					{item.title}
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
