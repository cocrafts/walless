import { FC } from 'react';
import { Stack, Text } from '@walless/gui';
import DecorationSquare from 'components/DecorationSquare';
import { ContainerStack } from 'components/styled';

import ExtensionIcon from './Icon';
import { extensions } from './shared';

export const ExtensionDownload: FC = () => {
	return (
		<ContainerStack marginTop={24} maxWidth={1500}>
			<Stack
				horizontal
				gap={12}
				$xs={{ justifyContent: 'center', marginTop: 64 }}
			>
				{extensions.map((item) => {
					return <ExtensionIcon key={item.download} item={item} />;
				})}
			</Stack>
			<Stack horizontal alignItems="center" marginTop={24}>
				<DecorationSquare marginHorizontal={8} />
				<Text
					color="rgba(255, 255, 255, 0.3)"
					fontSize={14}
					fontWeight="300"
					fontStyle="italic"
				>
					(Internal test, for developer only)
				</Text>
			</Stack>
		</ContainerStack>
	);
};

export default ExtensionDownload;
