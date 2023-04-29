import HomeLayout from 'components/layouts/Home';
import EditTool from 'features/home/EditTool';
import ExtensionDownload from 'features/home/ExtensionDownload';
import HeadingSection from 'features/home/HeadingSection';

export const IndexPage = () => {
	return (
		<HomeLayout>
			<HeadingSection />
			<ExtensionDownload />
			<EditTool />
		</HomeLayout>
	);
};

export default IndexPage;
