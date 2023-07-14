import type { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';

interface Props {
	icon: string;
	name: string;
}

const IconText: FC<Props> = ({ icon, name }) => {
	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="center"
			gap={4}
		>
			<Image src={icon} width={16} height={16} borderRadius={8} />
			<Text fontWeight="400" fontSize={14} color="#FFFFFF">
				{name}
			</Text>
		</Stack>
	);
};

export default IconText;
