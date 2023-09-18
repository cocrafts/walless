import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useRouter } from 'next/router';

import BlogCard from './BlogCard';
import CategoryItem from './CategoryItem';
import type { Blog, Query } from './internal';
import { blogs, Category } from './internal';
import SlidingSection from './SlidingSection.tsx';

const BlogFeature = () => {
	const [fullLayout, setFullLayout] = useState({
		width: 1150,
	});

	const router = useRouter();
	const { category } = router.query as unknown as Query;

	const categories = Object.keys(Category);

	const smallBlogCardStyle = {
		width: (fullLayout.width - 30) / 2,
	};

	const [fullListOfBlogs, setFullListOfBlogs] = useState<Blog[]>(blogs);

	const handleNavigateToCategory = (category: string) => {
		if (category === 'all') {
			router.push('/blogs');
		} else {
			router.push(`/blogs?category=${category}`);
		}
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

			{fullListOfBlogs.length !== 0 && (
				<View style={styles.blogsContainer}>
					<SlidingSection listOfBlogs={fullListOfBlogs} />

					<View
						style={styles.fullBlogsContainer}
						onLayout={(event) => {
							setFullLayout({
								width: event.nativeEvent.layout.width,
							});
						}}
					>
						{fullListOfBlogs.map((blog) => (
							<BlogCard
								key={blog.id}
								style={smallBlogCardStyle}
								id={blog.id}
								title={blog.title}
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
	blogsContainer: {
		gap: 60,
	},
	fullBlogsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap: 30,
	},
});
