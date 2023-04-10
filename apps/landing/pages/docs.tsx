import { Text } from '@walless/gui';
import Anchor from 'components/Anchor';
import HomeLayout from 'components/layouts/Home';
import { ContainerStack } from 'components/styled';

export const DocumentationPage = () => {
	return (
		<HomeLayout>
			<ContainerStack alignItems="center" justifyContent="center">
				<Text marginTop={120} marginBottom={24}>
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
