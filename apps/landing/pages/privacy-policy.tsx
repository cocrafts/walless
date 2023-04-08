import Markdown from '@walless/markdown';
import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';

export const PolicyPage = () => {
	return (
		<HomeLayout>
			<ContainerStack>
				<Markdown content={require('../documents/privacy.md')} />
			</ContainerStack>
		</HomeLayout>
	);
};

export default PolicyPage;
