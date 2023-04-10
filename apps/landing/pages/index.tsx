import HomeLayout from 'components/layouts/Home';
import ExtensionDownload from 'features/home/ExtensionDownload';
import HeadingSection from 'features/home/HeadingSection';

export const IndexPage = () => {
	return (
		<HomeLayout>
			<HeadingSection />
			<ExtensionDownload />
		</HomeLayout>
	);
};

export default IndexPage;
