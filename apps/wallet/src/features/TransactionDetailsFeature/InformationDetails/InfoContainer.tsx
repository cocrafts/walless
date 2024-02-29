import type { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	title: string;
	content: ReactNode;
}

export const InfoContainer: FC<Props> = ({ title, content }) => {
	return (
		<View style={styles.detailContainer}>
			<Text style={styles.infoTitle}>{title}</Text>

			{content}
		</View>
	);
};

export default InfoContainer;

const styles = StyleSheet.create({
	infoTitle: {
		color: '#ffffff',
	},
	detailContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 18,
	},
});
