import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';
import Image from 'next/image';

import type { Category } from './internal';

export interface BlogCardProps {
	style?: ViewStyle;
	coverImageSize?: number;
	title: string;
	coverImage: string;
	description: string;
	date: Date;
	category: Category;
}

const BlogCard: FC<BlogCardProps> = ({
	style,
	coverImageSize = 300,
	title,
	coverImage,
	description: description,
	date,
	category,
}) => {
	const LARGE_SIZE = 800;
	const isLarge = style?.width && style?.width >= LARGE_SIZE;

	return (
		<TouchableOpacity style={[styles.container, style]}>
			<View style={styles.contentContainer}>
				<View>
					<View>
						<Text style={isLarge ? styles.largeCategory : styles.smallCategory}>
							{category}
						</Text>
					</View>

					<Text
						ellipsizeMode="tail"
						numberOfLines={2}
						style={isLarge ? styles.largeTitle : styles.smallTitle}
					>
						{title}
					</Text>
					<Text
						ellipsizeMode="tail"
						numberOfLines={isLarge ? 5 : 3}
						style={isLarge ? styles.largeDescription : styles.smallDescription}
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
		height: 'fit-content',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#131C24',
		padding: 30,
		borderRadius: 20,
		gap: 30,
	},
	largeContainer: {
		padding: 50,
		gap: 50,
	},
	smallContainer: {
		padding: 30,
		gap: 30,
	},
	contentContainer: {
		flex: 1,
		height: '100%',
		justifyContent: 'space-between',
	},
	coverImage: {
		flex: 1,
		borderRadius: 15,
	},
	largeCategory: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 20,
	},
	smallCategory: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 16,
	},
	largeTitle: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 40,
	},
	smallTitle: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 20,
	},
	largeDescription: {
		flex: 1,
		color: '#566674',
		fontSize: 20,
	},
	smallDescription: {
		flex: 1,
		color: '#566674',
		fontSize: 16,
	},
});
