import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useRouter } from 'next/router';

import Indicator from './Slider/Indicator';
import BlogCard from './BlogCard';
import CategoryItem from './CategoryItem';
import type { Blog, Query } from './internal';
import { blogs, Category } from './internal';
import type { IndicatorOption, SlideOption } from './Slider';
import Slider from './Slider';

const BlogFeature = () => {
	const [slidingLayout, setSlidingLayout] = useState({
		width: 1100,
		height: 1100,
	});

	const [fullLayout, setFullLayout] = useState({
		width: 1100,
		height: 1100,
	});

	const router = useRouter();
	const { category } = router.query as unknown as Query;

	const categories = Object.keys(Category);

	const largeBlogCardStyle = {
		width: slidingLayout.width,
	};

	const smallBlogCardStyle = {
		width: (fullLayout.width - 30) / 2,
	};

	const convertBlogToSlideOption = (
		blogs: Blog[],
		style?: ViewStyle,
		coverImageSize?: number,
	): SlideOption[] => {
		return blogs.map(
			({ id, title, category, date, description, coverImage }, index) => {
				return {
					id: index.toString(),
					component: () => (
						<BlogCard
							key={id}
							style={style}
							title={title}
							coverImageSize={coverImageSize}
							category={category}
							coverImage={coverImage}
							description={description}
							date={date}
						/>
					),
				};
			},
		);
	};

	const [slidingList, setSlidingList] = useState<SlideOption[]>(
		convertBlogToSlideOption(
			blogs.slice(blogs.length - 3),
			largeBlogCardStyle,
			540,
		),
	);

	const [fullListOfBlogs, setFullListOfBlogs] = useState<Blog[]>(blogs);

	const handleNavigateToCategory = (category: string) => {
		if (category === 'all') {
			router.push('/blogs');
		} else {
			router.push(`/blogs?category=${category}`);
		}
	};

	const indicator: IndicatorOption = {
		id: 'indicator',
		component: Indicator,
		context: { cardList: slidingList.reverse() },
	};

	useEffect(() => {
		const getListOfBlogs = () => {
			if (!category) {
				return blogs;
			}
			return blogs.filter((blog) => {
				return blog.category.toLowerCase() === category;
			});
		};

		const temp = getListOfBlogs();

		setFullListOfBlogs(temp);

		setSlidingList(
			convertBlogToSlideOption(
				temp.slice(temp.length - 3),
				largeBlogCardStyle,
				480,
			),
		);
	}, [category]);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{ uri: '' }}
				resizeMode="cover"
				style={styles.heroSection}
			>
				<Text style={styles.title}>Blog</Text>
			</ImageBackground>

			<View style={styles.navigationBar}>
				{categories.map((item) => (
					<CategoryItem
						key={item}
						title={item}
						currentCategory={category}
						onPress={() => handleNavigateToCategory(item)}
					/>
				))}
			</View>

			{slidingList.length !== 0 && (
				<View>
					<View
						onLayout={(event) => {
							setSlidingLayout({
								width: event.nativeEvent.layout.width,
								height: event.nativeEvent.layout.height,
							});
						}}
					>
						<Slider
							style={styles.slider}
							items={slidingList.reverse()}
							distance={-slidingLayout.width}
							indicator={indicator}
						/>
					</View>
					<View
						style={styles.blogsContainer}
						onLayout={(event) => {
							setFullLayout({
								width: event.nativeEvent.layout.width,
								height: event.nativeEvent.layout.height,
							});
						}}
					>
						{fullListOfBlogs.map((blog) => (
							<BlogCard
								key={blog.id}
								style={smallBlogCardStyle}
								title={blog.title}
								coverImageSize={300}
								category={blog.category}
								coverImage={blog.coverImage}
								description={blog.description}
								date={blog.date}
							/>
						))}
					</View>
				</View>
			)}
		</View>
	);
};

export default BlogFeature;
const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 20,
	},
	heroSection: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 205,
		borderRadius: 30,
		backgroundColor: '#19A3E1',
	},
	title: {
		fontSize: 60,
		fontWeight: '500',
		color: '#ffffff',
	},
	navigationBar: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	navigationItem: {
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
	category: {
		color: '#566674',
	},
	slider: {},
	blogsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap: 30,
	},
});
