import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { ArrowRight, BlogCategory } from '@walless/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';

import type { Category } from './internal';

export interface BlogCardProps {
	style?: ViewStyle;
	id: string;
	title: string;
	coverImage: string;
	description: string;
	date: Date;
	category: Category;
}

const BlogCard: FC<BlogCardProps> = ({
	style,
	id,
	title,
	coverImage,
	description: description,
	date,
	category,
}) => {
	const LARGE_SIZE = 1200;
	const MEDIUM_SIZE = 800;

	const isLarge = style?.width && style?.width >= LARGE_SIZE;
	const isMedium = style?.width && style?.width >= MEDIUM_SIZE;

	const LARGE_COVER_IMAGE_SIZE = 540;
	const MEDIUM_COVER_IMAGE_SIZE = 420;
	const SMALL_COVER_IMAGE_SIZE = 270;

	const LARGE_TITLE_SIZE = 40;
	const MEDIUM_TITLE_SIZE = 20;
	const SMALL_TITLE_SIZE = 16;

	const LARGE_DESCRIPTION_SIZE = 20;
	const MEDIUM_DESCRIPTION_SIZE = 16;
	const SMALL_DESCRIPTION_SIZE = 14;

	const LARGE_CATEGORY_SIZE = 20;
	const MEDIUM_CATEGORY_SIZE = 16;
	const SMALL_CATEGORY_SIZE = 14;

	const coverImageSize = isLarge
		? LARGE_COVER_IMAGE_SIZE
		: isMedium
		? MEDIUM_COVER_IMAGE_SIZE
		: SMALL_COVER_IMAGE_SIZE;

	const categorySize = isLarge
		? LARGE_CATEGORY_SIZE
		: isMedium
		? MEDIUM_CATEGORY_SIZE
		: SMALL_CATEGORY_SIZE;

	const titleSize = isLarge
		? LARGE_TITLE_SIZE
		: isMedium
		? MEDIUM_TITLE_SIZE
		: SMALL_TITLE_SIZE;

	const descriptionSize = isLarge
		? LARGE_DESCRIPTION_SIZE
		: isMedium
		? MEDIUM_DESCRIPTION_SIZE
		: SMALL_DESCRIPTION_SIZE;

	const containerStyle = isLarge
		? styles.largeContainer
		: isMedium
		? styles.mediumContainer
		: styles.smallContainer;

	const router = useRouter();

	const handleNavigateToLayoutDetails = () => {
		router.push(`/blogs/${id}`);
	};

	return (
		<TouchableOpacity
			style={[styles.container, containerStyle, style]}
			onPress={handleNavigateToLayoutDetails}
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
						numberOfLines={isLarge ? 5 : isMedium ? 4 : 3}
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
		</TouchableOpacity>
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
	largeCategory: {
		fontSize: 20,
	},
	mediumCategory: {
		fontSize: 14,
	},
	smallCategory: {
		fontSize: 14,
	},
	title: {
		color: '#ffffff',
		fontWeight: '500',
	},

	description: {
		color: '#566674',
	},
	largeDescription: {
		fontSize: 20,
	},
	mediumDescription: {
		fontSize: 16,
	},
	smallDescription: {
		fontSize: 14,
	},
});
