import { type FC, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowRight, BlogCategory } from '@walless/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';

import type { Category } from '../internal';

import HoveredCard from './HoveredCard';

export interface BlogCardProps {
	style?: ViewStyle;
	id: string;
	title: string;
	coverImage: string;
	description: string;
	date: Date;
	category: Category;
}

export interface ResponsiveState {
	coverImageSize: number;
	categorySize: number;
	titleSize: number;
	descriptionSize: number;
	containerStyle: object;
	numberOfLines: number;
}

const getResponsiveState = (size: number): ResponsiveState => {
	const LARGE_SIZE = 1200;
	const MEDIUM_SIZE = 800;

	if (size && size >= LARGE_SIZE) {
		return {
			coverImageSize: 540,
			categorySize: 20,
			titleSize: 40,
			descriptionSize: 20,
			containerStyle: styles.largeContainer,
			numberOfLines: 5,
		};
	} else if (size && size >= MEDIUM_SIZE) {
		return {
			coverImageSize: 420,
			categorySize: 16,
			titleSize: 20,
			descriptionSize: 16,
			containerStyle: styles.mediumContainer,
			numberOfLines: 4,
		};
	} else {
		return {
			coverImageSize: 270,
			categorySize: 14,
			titleSize: 16,
			descriptionSize: 14,
			containerStyle: styles.smallContainer,
			numberOfLines: 3,
		};
	}
};

const BlogCard: FC<BlogCardProps> = ({
	style,
	id,
	title,
	coverImage,
	description: description,
	date,
	category,
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [hoverContainerHeight, setHoverContainerHeight] = useState<number>(0);

	const responsiveState = getResponsiveState(style?.width);

	const {
		coverImageSize,
		categorySize,
		titleSize,
		descriptionSize,
		containerStyle,
		numberOfLines,
	} = responsiveState;

	const router = useRouter();

	const handleNavigateToLayoutDetails = () => {
		router.push(`/blogs/${id}`);
	};

	return (
		<Hoverable
			onPress={handleNavigateToLayoutDetails}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
		>
			{!isHovered ? (
				<View
					style={[styles.container, containerStyle, style]}
					onLayout={(event) => {
						setHoverContainerHeight(event.nativeEvent.layout.height);
					}}
				>
					<View style={styles.contentContainer}>
						<View style={styles.informationContainer}>
							<View style={styles.categoryContainer}>
								<BlogCategory color="#19A3E1" />
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
								style={[styles.description, { fontSize: descriptionSize }]}
							>
								{description}
							</Text>
						</View>

						<View>
							<Text>
								{date.toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</Text>
							<ArrowRight size={30} />
						</View>
					</View>

					<View>
						<Image
							style={styles.coverImage}
							src={coverImage}
							alt={coverImage}
							width={coverImageSize}
							height={(coverImageSize * 2) / 3}
						/>
					</View>
				</View>
			) : (
				<HoveredCard
					style={style}
					height={hoverContainerHeight}
					title={title}
					category={category}
					description={description}
					date={date}
					responsiveState={responsiveState}
				/>
			)}
		</Hoverable>
	);
};

export default BlogCard;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		maxWidth: 1200,
		height: 'fit-content',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#202D38',
		padding: 30,
		borderRadius: 20,
		gap: 30,
	},
	largeContainer: {
		padding: 50,
		gap: 50,
	},
	mediumContainer: {
		padding: 40,
		gap: 40,
	},
	smallContainer: {
		padding: 20,
		gap: 20,
	},
	contentContainer: {
		flex: 1,
		maxWidth: '70%',
		height: '100%',
		justifyContent: 'space-between',
	},
	coverImage: {
		flex: 1,
		borderRadius: 15,
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
	description: {
		color: '#566674',
	},
	date: {
		color: '#ffffff',
	},
});
