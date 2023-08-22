import HomeLayout from 'components/layouts/Home';
// import Developer from 'features/home/Developer';
import EasyOnboarding from 'features/home/EasyOnboarding';
import EditTool from 'features/home/EditTool';
import ExtensionDownload from 'features/home/ExtensionDownload';
import HeadingSection from 'features/home/HeadingSection';
// TODO: Refactor Partners section
import Partners from 'features/home/LegacyPartners';
import News from 'features/home/News';

export const IndexPage = () => {
    return (
        <HomeLayout>
            <HeadingSection />
            <ExtensionDownload />
            <EasyOnboarding />
            <EditTool />
            {/* <Developer /> */}
            <News />
            <Partners />
        </HomeLayout>
    );
};

export default IndexPage;
