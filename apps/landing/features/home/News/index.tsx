import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import SectionContainer from 'components/SectionContainer';

import CardNews from './CardNews';
import { mockData } from './internal';

export const News = () => {
	return (
		<SectionContainer style={styles.container}>
			<Text style={styles.title}>What&rsquo;s in the corner :)</Text>
			<View style={styles.contentContainer}>
				{mockData.map((data, idx) => {
					const isLastItem = idx === mockData.length - 1;

					return (
						<CardNews
							key={idx}
							data={data}
							style={isLastItem ? { marginRight: 0 } : {}}
						/>
					);
				})}
			</View>
		</SectionContainer>
	);
};

export default News;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	title: {
		fontSize: 32,
		fontWeight: '500',
		color: '#ffffff',
	},
	contentContainer: {
		width: '100%',
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
