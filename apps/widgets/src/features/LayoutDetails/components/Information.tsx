import type { FC } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { Heart } from '@walless/icons';
import type { LayoutProps } from 'features/internal';
import Image from 'next/image';

interface Props {
	style?: ViewStyle;
	layout: LayoutProps;
	logoSize: number;
	titleStyle?: TextStyle;
	descriptionStyle?: TextStyle;
	activityStyle?: TextStyle;
}

const Information: FC<Props> = ({
	layout,
	style,
	logoSize,
	titleStyle = styles.title,
	descriptionStyle = styles.description,
	activityStyle = styles.activityText,
}) => {
	const { logoImage, title, description, loveCount, activeCount }: LayoutProps =
		layout;

	return (
		<View style={style}>
			<View style={styles.titleContainer}>
				<Image src={logoImage} alt={title} width={logoSize} height={logoSize} />
				<Text style={titleStyle}>{title}</Text>
			</View>

			<Text style={descriptionStyle}>{description}</Text>

			<View style={styles.bottomContainer}>
				<View style={styles.activityContainer}>
					<Heart colors={['white']} size={8} />
					<Text style={activityStyle}>{loveCount} Love</Text>
				</View>

				<View style={styles.activityContainer}>
					<View style={styles.activeDisplay} />
					<Text style={activityStyle}>{activeCount} Active</Text>
				</View>
			</View>
		</View>
	);
};

export default Information;

const styles = StyleSheet.create({
	titleContainer: {
		alignItems: 'center',
		gap: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#ffffff',
	},
	description: {
		color: '#A4B3C1',
		height: 36,
	},
	bottomContainer: {
		width: '100%',
		flexDirection: 'row',
		gap: 4,
	},
	activityContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	activeDisplay: {
		width: 6,
		height: 6,
		backgroundColor: '#0694D3',
		borderRadius: 4,
	},
	activityText: {
		margin: 8,
		fontSize: 12,
		color: '#566674',
	},
});
