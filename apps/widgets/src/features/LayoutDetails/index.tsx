import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { logger } from '@walless/core';
import { View } from '@walless/gui';
import type { LayoutProps } from 'features/internal';
import Image from 'next/image';

import DetailsTab from './components/DetailTabs';
import Information from './components/Information';
import RectangleButton from './components/RectangleButton';

interface Props {
	style?: ViewStyle;
	layout: LayoutProps;
}

const LayoutDetails: FC<Props> = ({ layout, style }) => {
	const information = {
		website: '73rBGJKygfUzuK9gUkkQrFXNg88VgHojeUogYR4yuvHu',
		category: '73rBGJKygfUzuK9gUkkQrFXNg88VgHojeUogYR4yuvHu',
		lastUpdate: '73rBGJKygfUzuK9gUkkQrFXNg88VgHojeUogYR4yuvHu',
	};

	return (
		<View style={style}>
			<View style={styles.coverContainer}>
				<Image src={layout.coverImage} alt={layout.title} fill={true} />
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.basicContainer}>
					<Information
						style={styles.informationContainer}
						layout={layout}
						logoSize={80}
						titleStyle={styles.title}
						descriptionStyle={styles.description}
						activityStyle={styles.activityText}
					/>

					<View style={styles.buttonContainer}>
						<RectangleButton
							title="Get early access"
							onPress={() => logger.info('Get early access')}
						/>
						<RectangleButton
							title="Share layout"
							onPress={() => logger.info('Share layout')}
							backgroundColor="#243F56"
						/>
					</View>
				</View>
				<View>
					<DetailsTab
						screenshots={layout.screenshots ?? []}
						information={layout.information ?? information}
						comments={layout.comments ?? []}
					/>
				</View>
			</View>
		</View>
	);
};

export default LayoutDetails;

const styles = StyleSheet.create({
	coverContainer: {
		width: 1200,
		height: 600,
	},
	bodyContainer: {
		flex: 1,
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 40,
		gap: 40,
	},
	basicContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	informationContainer: {
		flex: 1,
		alignItems: 'flex-start',
		marginTop: -40,
		gap: 12,
	},
	title: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: '600',
	},
	description: {
		color: '#A4B3C1',
		height: 48,
		fontSize: 16,
		fontWeight: '500',
	},
	activityText: {
		margin: 8,
		color: '#566674',
	},
	buttonContainer: {
		flex: 1,
		gap: 16,
	},
});
