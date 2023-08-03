import type { MarkdownOptions } from '@walless/markdown';
import Markdown from '@walless/markdown';
import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';

export const PolicyPage = () => {
	return (
		<HomeLayout theme="light">
			<ContainerStack maxWidth={1024}>
				<Markdown
					options={markdownOptions}
					content={require('../documents/privacy.md')}
				/>
			</ContainerStack>
		</HomeLayout>
	);
};

export default PolicyPage;

const markdownOptions: MarkdownOptions = {
	colors: {
		text: '#4c4c4c',
		alt: '#b0b0b0',
	},
};
