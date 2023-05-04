import { ContainerStack } from 'components/styled';

import LayoutInStore from './LayoutInStore';

const EditTool = () => {
	return (
		<ContainerStack marginTop={72} maxWidth={1500} alignItems="center" gap={36}>
			<LayoutInStore />
		</ContainerStack>
	);
};

export default EditTool;
