import HomeLayout from 'components/layouts/Home';
import EasyOnboarding from 'features/home/EasyOnboarding';
import ExtensionDownload from 'features/home/ExtensionDownload';
import HeadingSection from 'features/home/HeadingSection';

export const IndexPage = () => {
	return (
		<HomeLayout>
			<HeadingSection />
			<EasyOnboarding />
			<ExtensionDownload />
		</HomeLayout>
	);
};

export default IndexPage;
