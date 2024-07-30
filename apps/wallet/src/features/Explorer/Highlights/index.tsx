import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

import CardCarousel from './CardCarousel';
import HighlightIndicator from './HighlightIndicator';

interface Props {
	data: WidgetDocument[];
}

const Highlights: FC<Props> = ({ data }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Today&apos;s Highlights</Text>
				<Text style={styles.description}>Get started with these apps</Text>
			</View>

			<View style={styles.highlightList}>
				<CardCarousel
					widgets={data}
					currentIndex={currentIndex}
					onChangeCurrentIndex={setCurrentIndex}
				/>

				<HighlightIndicator
					currentIndex={currentIndex}
					dataLength={data.length}
				/>
			</View>
		</View>
	);
};

export default Highlights;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		minHeight: 200,
		marginTop: 24,
	},
	highlightList: {
		gap: 14,
	},
	titleContainer: {
		gap: 4,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#ffffff',
	},
	description: {
		fontSize: 13,
		color: '#A4B3C1',
	},
});
