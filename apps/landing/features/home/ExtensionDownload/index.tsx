import { FC } from 'react';
import { Stack } from '@walless/gui';
import DecorationSquare from 'components/DecorationSquare';
import { ContainerStack } from 'components/styled';

import ExtensionIcon from './Icon';
import { extensions } from './shared';

export const ExtensionDownload: FC = () => {
	return (
		<ContainerStack marginTop={24}>
			<Stack
				horizontal
				gap={12}
				$xs={{ justifyContent: 'center', marginTop: 64 }}
			>
				{extensions.map((item) => {
					return <ExtensionIcon key={item.download} item={item} />;
				})}
			</Stack>
			<DecorationSquare marginTop={24} marginLeft={8} />
		</ContainerStack>
	);
};

export default ExtensionDownload;
