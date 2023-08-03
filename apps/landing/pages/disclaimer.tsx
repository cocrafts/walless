import type { MarkdownOptions } from '@walless/markdown';
import Markdown from '@walless/markdown';
import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';

export const DisclaimerPage = () => {
	return (
		<HomeLayout theme="light">
			<ContainerStack maxWidth={1024}>
				<Markdown
					options={markdownOptions}
					content={require('../documents/disclaimer.md')}
				/>
			</ContainerStack>
		</HomeLayout>
	);
};

export default DisclaimerPage;

const markdownOptions: MarkdownOptions = {
	colors: {
		text: '#4c4c4c',
		alt: '#b0b0b0',
	},
};
