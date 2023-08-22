import { Fragment, useEffect } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const IndexPage = ({
	imgUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	useEffect(() => {
		router.replace('/');
	}, []);

	return (
		<Fragment>
			{imgUrl && (
				<Head>
					<meta property="og:image" content={imgUrl} key="ogImage" />
					<meta property="twitter:image" content={imgUrl} key="twitterImage" />
				</Head>
			)}
		</Fragment>
	);
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<{
	imgUrl: string;
}> = async ({ query }) => {
	const { waitlistCount } = query;
	const imgUrl: string = waitlistCount
		? `https://cdn.stormgate.io/walless/waitlist-cards/${waitlistCount}.png`
		: '';

	return { props: { imgUrl } };
};
