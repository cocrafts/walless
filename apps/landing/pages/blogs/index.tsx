import { StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
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
});
