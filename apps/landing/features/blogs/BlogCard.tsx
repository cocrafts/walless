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
	return (
		<TouchableOpacity style={[styles.container, style]}>
			<View style={styles.contentContainer}>
				<View>
					<View>
						<Text style={styles.category}>{category}</Text>
					</View>

					<Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
						{title}
					</Text>
					<Text
						ellipsizeMode="tail"
						numberOfLines={5}
						style={styles.description}
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
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		minHeight: 250,
		padding: 30,
		borderRadius: 20,
		backgroundColor: '#131C24',
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
	category: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 20,
	},
	title: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 40,
	},
	description: {
		flex: 1,
		color: '#566674',
		fontSize: 20,
	},
});
