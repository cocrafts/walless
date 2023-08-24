import { type FC, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';

import type { NewsArticle } from './internal';

interface Props {
	data: NewsArticle;
	style: ViewStyle;
}

const MIN_CONTENT_WIDTH = 120;
const IMAGE_IDEAL_WIDTH = 250;
const TOTAL_HORIZONTAL_SPACING = 20 * 2 + 30;
const BREAKPOINT =
	MIN_CONTENT_WIDTH + IMAGE_IDEAL_WIDTH + TOTAL_HORIZONTAL_SPACING;

export const CardNews: FC<Props> = ({ data, style }) => {
	const [breaked, setBreaked] = useState(false);

	return (
		<Hoverable
			style={[styles.cardContainer, style]}
			onPress={() => Linking.openURL(data.link)}
			onLayout={({
				nativeEvent: {
					layout: { width },
				},
			}) => setBreaked(width < BREAKPOINT)}
		>
			<View style={styles.cardContent}>
				<Text style={styles.cardTitle} numberOfLines={2}>
					{data.title}
				</Text>
				<Text style={styles.cardDescription} numberOfLines={3}>
					{data.description}
				</Text>
				{!breaked && (
					<View style={styles.cardLink}>
						<View horizontal style={{ alignItems: 'center' }}>
							<Text style={styles.cardLinkText}>Read</Text>
							<ArrowRight size={20} />
						</View>
					</View>
				)}
			</View>
			<Image source={data.image} style={styles.image} />
		</Hoverable>
	);
};

export default CardNews;

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		backgroundColor: '#202D38',
		padding: 20,
		borderRadius: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		minWidth: 320,
		rowGap: 20,
		columnGap: 30,
	},
	cardContent: {
		flex: 1,
		minWidth: MIN_CONTENT_WIDTH,
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
		marginVertical: 10,
	},
	image: {
		aspectRatio: 283 / 196,
		minWidth: IMAGE_IDEAL_WIDTH,
		flex: 1,
		borderRadius: 10,
	},
});
