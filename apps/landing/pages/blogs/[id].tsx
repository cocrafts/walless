import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';
import BlogDetails from 'features/blogs/BlogDetails';
import type { Blog } from 'features/blogs/internal';
import { blogs } from 'features/blogs/internal';
import { useRouter } from 'next/router';

const BlogScreen = () => {
	const [blog, setBlog] = useState<Blog | null>(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const selectedBlog = blogs.find((blog) => blog.id === id);
		if (selectedBlog) {
			setBlog(selectedBlog);
		}
	}, [id]);

	return (
		<HomeLayout>
			<ContainerStack alignItems="center" justifyContent="center">
				{!blog ? (
					<ActivityIndicator />
				) : (
					<BlogDetails
						id={blog.id}
						title={blog.title}
						category={blog.category}
						date={blog.date}
						coverImage={blog.coverImage}
						content={blog.content}
						activityImages={blog.activityImages}
					/>
				)}
			</ContainerStack>
		</HomeLayout>
	);
};

export default BlogScreen;
