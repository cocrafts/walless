import { Fragment } from 'react';
import HomeLayout from 'components/layouts/Home';
// import Developer from 'features/home/Developer';
import EasyOnboarding from 'features/home/EasyOnboarding';
import EditTool from 'features/home/EditTool';
import ExtensionDownload from 'features/home/ExtensionDownload';
import HeadingSection from 'features/home/HeadingSection';
// TODO: Refactor Partners section
import Partners from 'features/home/LegacyPartners';
import News from 'features/home/News';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

export const IndexPage = ({
	imgUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<Fragment>
			{imgUrl && (
				<Head>
					<meta property="og:image" content={imgUrl} key="ogImage" />
					<meta property="twitter:image" content={imgUrl} key="twitterImage" />
				</Head>
			)}
			<HomeLayout>
				<HeadingSection />
				<ExtensionDownload />
				<EasyOnboarding />
				<EditTool />
				{/* <Developer /> */}
				<News />
				<Partners />
			</HomeLayout>
		</Fragment>
	);
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<{
	imgUrl: string;
}> = async ({ query }) => {
	const { params } = query;
	const imgUrl: string = params?.[0]
		? `https://cdn.stormgate.io/walless/waitlist-cards/${params[0]}.png`
		: '';

	return { props: { imgUrl } };
};
