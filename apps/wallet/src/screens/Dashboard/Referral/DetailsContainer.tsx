import type { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	title: string;
	value: string;
	LeftIcon?: ReactNode;
	RightIcon?: ReactNode;
}

const DetailsContainer: FC<Props> = ({ LeftIcon, RightIcon, title, value }) => {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				{LeftIcon}
				<View style={styles.detailsContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.value}>{value}</Text>
				</View>
			</View>

			<View>{RightIcon}</View>
		</View>
	);
};

export default DetailsContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#19232C',
		gap: 8,
		padding: 8,
		borderRadius: 16,
	},
	title: {
		fontSize: 12,
		color: '#798997',
	},
	value: {
		color: '#ffffff',
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	detailsContainer: {
		gap: 2,
	},
});
