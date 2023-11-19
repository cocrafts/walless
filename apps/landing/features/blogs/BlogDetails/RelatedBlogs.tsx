import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import BlogCard from '../BlogCard';
import type { Blog } from '../internal';

interface Props {
	relatedBlogs: Blog[];
}

const RelatedBlogs: FC<Props> = ({ relatedBlogs }) => {
	const [blogCardContainerWidth, setBlogCardContainerWidth] =
		useState<number>(0);
	return (
		<View style={styles.container}>
			<Text style={styles.activities}>Read more like this</Text>
			<View
				style={styles.relatedBlogsContainer}
				onLayout={(event) => {
					setBlogCardContainerWidth(event.nativeEvent.layout.width);
				}}
			>
				{relatedBlogs.slice(0, 2).map((blog) => (
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
	);
};

export default RelatedBlogs;

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	activities: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
	},
	relatedBlogsContainer: {
		flexDirection: 'row',
		gap: 30,
		flexWrap: 'wrap',
	},
});
