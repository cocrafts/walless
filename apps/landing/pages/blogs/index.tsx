import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';
import BlogFeature from 'features/blogs';

export const BlogPage = () => {
	return (
		<HomeLayout>
			<ContainerStack alignItems="center" justifyContent="center">
				<BlogFeature />
			</ContainerStack>
		</HomeLayout>
	);
};

export default BlogPage;
