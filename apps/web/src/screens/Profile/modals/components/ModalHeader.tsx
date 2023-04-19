import { FC } from 'react';
import { modalActions, ModalConfigs } from '@walless/app';
import { Times } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

interface Props {
	content: string;
	config: ModalConfigs;
}

const ModalHeader: FC<Props> = ({ content, config }) => {
	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
		>
			<Text color="#FFFFFF" fontWeight="500" fontSize={20}>
				{content}
			</Text>
			<Stack
				onPress={() => {
					modalActions.destroy(config.id);
				}}
				cursor="pointer"
			>
				<Times size={16} />
			</Stack>
		</Stack>
	);
};

export default ModalHeader;
