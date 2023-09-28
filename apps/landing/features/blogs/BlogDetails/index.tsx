import type { FC } from 'react';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { BlogCategory } from '@walless/icons';
import Carousel from 'features/blogs/BlogDetails/Carousel/Carousel';
import CarouselControl from 'features/blogs/BlogDetails/Carousel/CarouselControl';
import { type Category, blogs } from 'features/blogs/internal';
import Image from 'next/image';

import BlogCard from '../BlogCard';

interface Props {
	id: string;
	title: string;
	category: Category;
	coverImage: string;
	date: Date;
	content: string[][];
	activityImages: string[];
}

const BlogDetails: FC<Props> = ({
	title,
	category,
	coverImage,
	date,
	content,
	activityImages,
}) => {
	const [contentWidth, setContentWidth] = useState<number>(0);
	const [blogCardContainerWidth, setBlogCardContainerWidth] =
		useState<number>(0);

	const carouselRef = useRef<{
		handleSlideLeftPress: () => void;
		handleSlideRightPress: () => void;
	}>();

	const handleLeftPress = () => {
		carouselRef.current?.handleSlideLeftPress();
	};

	const handleRightPress = () => {
		carouselRef.current?.handleSlideRightPress();
	};

	const relatedBlogs = blogs.filter((blog) => blog.category === category);

	return (
		<View>
			<View style={styles.bodyContainer}>
				<View style={styles.leftContainer}>
					<View>
						<View style={styles.categoryContainer}>
							<BlogCategory color="#0694D3" size={20} />
							<Text style={styles.category}>{category}</Text>
						</View>

						<Text style={styles.title}>{title}</Text>
					</View>

					<Text style={styles.date}>
						{date.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</Text>
				</View>
				<View
					style={styles.rightContainer}
					onLayout={(event) => {
						setContentWidth(event.nativeEvent.layout.width);
					}}
				>
					<View style={styles.contentContainer}>
						{content.map((paragraphs, index) => (
							<View key={index}>
								{paragraphs.map((paragraph, idx) => (
									<Text key={idx} style={styles.content}>
										{paragraph}
									</Text>
								))}
							</View>
						))}
						<Image
							style={styles.coverImage}
							src={coverImage}
							alt={coverImage}
							width={contentWidth}
							height={(contentWidth * 2) / 3}
						/>
					</View>
					<View>
						<View style={[styles.carouselContainer, { width: contentWidth }]}>
							<View style={styles.carouselControl}>
								<Text style={styles.activities}>More activities</Text>
								<CarouselControl
									handleLeftPress={handleRightPress}
									handleRightPress={handleLeftPress}
								/>
							</View>

							<Carousel
								ref={carouselRef}
								style={styles.carousel}
								listOfItems={activityImages}
							/>
						</View>
					</View>
				</View>
			</View>
			<View>
				<Text style={styles.activities}>Related blogs</Text>
				<View
					style={styles.relatedBlogsContainer}
					onLayout={(event) => {
						setBlogCardContainerWidth(event.nativeEvent.layout.width);
						console.log(event.nativeEvent.layout.width);
					}}
				>
					{relatedBlogs.map((blog) => (
						<BlogCard
							key={blog.id}
							style={{ width: (blogCardContainerWidth - 30) / 2 }}
							id={blog.id}
							title={blog.title}
							category={blog.category}
							coverImage={blog.coverImage}
							date={blog.date}
							description={blog.description}
						/>
					))}
				</View>
			</View>
		</View>
	);
};

export default BlogDetails;

const styles = StyleSheet.create({
	bodyContainer: {
		flexDirection: 'row',
		gap: 60,
	},
	coverImage: {
		borderRadius: 18,
	},
	leftContainer: {
		maxWidth: 300,
		gap: 20,
	},
	rightContainer: {
		flex: 1,
		maxWidth: 1000,
		width: '100%',
		gap: 50,
	},
	categoryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	category: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
		textDecorationLine: 'underline',
	},
	title: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 40,
	},
	date: {
		color: '#ffffff',
		fontSize: 18,
	},
	content: {
		color: '#566674',
		fontSize: 20,
	},
	contentContainer: {
		gap: 20,
	},
	activities: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
	},
	carouselContainer: {
		gap: 20,
	},
	carouselControl: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	carousel: {
		maxWidth: '100%',
		flex: 1,
		borderRadius: 10,
	},
	relatedBlogsContainer: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		gap: 30,
		flexWrap: 'wrap',
	},
});