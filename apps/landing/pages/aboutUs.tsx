import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';
import AboutUsFeature from 'features/aboutUs';

const AboutUsPage = () => {
	return (
		<HomeLayout>
			<ContainerStack alignItems="center" justifyContent="center">
				<AboutUsFeature />
			</ContainerStack>
		</HomeLayout>
	);
};

export default AboutUsPage;
