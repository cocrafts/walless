import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

export interface InfoProps {
	website: string;
	category: string;
	lastUpdate: string;
}

const InformationTab: FC<InfoProps> = ({ website, category, lastUpdate }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Website</Text>
				<Text>{website}</Text>
			</View>
			<View>
				<Text style={styles.title}>Category</Text>
				<Text>{category}</Text>
			</View>
			<View>
				<Text style={styles.title}>Last Update</Text>
				<Text>{lastUpdate}</Text>
			</View>
		</View>
	);
};

export default InformationTab;

const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
	title: {
		color: '#566674',
		fontSize: 18,
		fontWeight: '500',
	},
});
