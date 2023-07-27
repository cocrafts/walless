import type { FC } from 'react';
import type { ModalConfigs } from '@walless/gui';
import { modalActions } from '@walless/gui';
import { Times } from '@walless/icons';
import { Button, Stack, Text } from '@walless/ui';

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
			<Button
				backgroundColor="transparent"
				padding={0}
				onPress={() => {
					modalActions.destroy(config.id);
				}}
			>
				<Times size={16} />
			</Button>
		</Stack>
	);
};

export default ModalHeader;
