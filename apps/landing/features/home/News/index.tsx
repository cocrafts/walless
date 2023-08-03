import { Image, Linking, StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';
import SectionContainer from 'components/SectionContainer';

import { mockData } from './internal';

export const News = () => {
	return (
		<SectionContainer style={styles.container}>
			<Text style={styles.title}>What&rsquo;s in the corner :)</Text>
			<View style={styles.contentContainer}>
				{mockData.map((data, idx) => {
					const isLastItem = idx === mockData.length - 1;

					return (
						<View
							key={idx}
							style={[styles.cardContainer, isLastItem && { marginRight: 0 }]}
						>
							<View style={styles.cardContent}>
								<Text style={styles.cardTitle} numberOfLines={2}>
									{data.title}
								</Text>
								<Text style={styles.cardDescription} numberOfLines={3}>
									{data.description}
								</Text>
								<View style={styles.cardLink}>
									<Hoverable
										horizontal
										style={{ alignItems: 'center' }}
										onPress={() => Linking.openURL(data.link)}
									>
										<Text style={styles.cardLinkText}>Read</Text>
										<ArrowRight size={20} />
									</Hoverable>
								</View>
							</View>
							<Image source={data.image} style={styles.image} />
						</View>
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
	cardContainer: {
		flex: 1,
		marginRight: 20,
		backgroundColor: '#202D38',
		padding: 20,
		borderRadius: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	cardContent: {
		flex: 1,
		marginRight: 30,
	},
	cardTitle: {
		fontSize: 18,
		lineHeight: 26,
		fontWeight: '500',
		color: '#ffffff',
	},
	cardDescription: {
		marginTop: 10,
		lineHeight: 20,
		color: '#566674',
	},
	cardLink: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	cardLinkText: {
		fontSize: 16,
		color: '#ffffff',
		marginRight: 5,
	},
	image: {
		aspectRatio: 283 / 196,
		width: 250,
		borderRadius: 10,
	},
});
