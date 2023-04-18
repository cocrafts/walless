import { Text } from '@walless/ui';
import Anchor from 'components/Anchor';
import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';

export const DocumentationPage = () => {
	return (
		<HomeLayout>
			<ContainerStack alignItems="center" justifyContent="center">
				<Text fontSize={32} marginTop={120}>
					Resources
				</Text>
				<Text marginTop={12} marginBottom={24}>
					This page is under construction, coming soon!
				</Text>
				<Anchor color="$link" href="/">
					Back to Home!
				</Anchor>
			</ContainerStack>
		</HomeLayout>
	);
};

export default DocumentationPage;
