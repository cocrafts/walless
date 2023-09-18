import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { ArrowRight, BlogCategory } from '@walless/icons';
import Image from 'next/image';

import type { Category } from '../internal';

import type { ResponsiveState } from '.';

interface Props {
	style?: ViewStyle;
	height: number;
	title: string;
	category: Category;
	date: Date;
	description: string;
	responsiveState: ResponsiveState;
}

const HoveredCard: FC<Props> = ({
	style,
	height,
	title,
	category,
	date,
	description,
	responsiveState,
}) => {
	const {
		categorySize,
		containerStyle,
		titleSize,
		descriptionSize,
		numberOfLines,
	} = responsiveState;

	return (
		<View
			style={[
				[styles.hoverContainer, containerStyle, { height: height }, style],
			]}
		>
			<View
				style={{
					position: 'absolute',
					right: 0,
					top: 0,
				}}
			>
				<Image
					src="/img/blogs/hover-image.svg"
					alt="hover"
					width={(height * 471) / 258}
					height={height}
					objectFit="contain"
				/>
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.informationContainer}>
					<View style={styles.categoryContainer}>
						<BlogCategory />
						<Text style={[styles.category, { fontSize: categorySize }]}>
							{category}
						</Text>
					</View>

					<Text
						ellipsizeMode="tail"
						numberOfLines={2}
						style={[styles.title, { fontSize: titleSize }]}
					>
						{title}
					</Text>
					<Text
						ellipsizeMode="tail"
						numberOfLines={numberOfLines}
						style={[styles.hoverDescription, { fontSize: descriptionSize }]}
					>
						{description}
					</Text>
				</View>

				<View>
					<Text style={styles.date}>
						{date.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</Text>
					<ArrowRight size={30} />
				</View>
			</View>
		</View>
	);
};

export default HoveredCard;

const styles = StyleSheet.create({
	hoverContainer: {
		backgroundColor: '#0694D3',
		height: 'fit-content',
		borderRadius: 20,
	},
	contentContainer: {
		flex: 1,
		maxWidth: '70%',
		height: '100%',
		justifyContent: 'space-between',
	},
	informationContainer: {
		gap: 10,
	},
	categoryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	category: {
		color: '#ffffff',
		fontWeight: '500',
	},
	title: {
		color: '#ffffff',
		fontWeight: '500',
	},
	hoverDescription: {
		color: '#ffffff',
	},
	date: {
		color: '#ffffff',
	},
});
