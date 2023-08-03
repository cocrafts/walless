import type { FC } from 'react';
import { Fragment } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { HomeLayout } from 'src/components';
import { loadMarkdown } from 'utils/engine';
import type { DocsTree } from 'utils/types';

interface Props {
	docsTree?: DocsTree;
}

const Home: FC<Props> = ({ docsTree }) => {
	const router = useRouter();

	return (
		<Fragment>
			{docsTree && (
				<HomeLayout
					docs={router.query.docs as string}
					params={router.query.params as string[]}
					docsTree={docsTree}
				/>
			)}
		</Fragment>
	);
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{
				params: {
					docs: 'general',
					params: [],
				},
			},
		],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const docsTree = await loadMarkdown();

	return {
		props: { docsTree },
	};
};
