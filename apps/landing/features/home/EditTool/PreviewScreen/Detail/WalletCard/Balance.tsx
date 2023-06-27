import { type FC } from 'react';
import { Eye } from '@walless/icons';
import { type MetadataDocument } from '@walless/store';
import { Stack, Text } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import TargetWrapper from 'features/home/EditTool/TargetWrapper';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

interface Props {
	token: MetadataDocument;
}

export const WalletBalance: FC<Props> = ({ token }) => {
	const { tools } = useSnapshot(appState);

	return (
		<Stack marginVertical={8}>
			<Stack flexDirection="row" alignItems="center" paddingLeft={5} gap={10}>
				<Eye size={18} />
				<TargetWrapper isTargeted={tools.target === DetailTool.token}>
					<Text height={42} fontSize={35} fontWeight={'500'}>
						0 {token?.symbol || 'XTZ'}
					</Text>
				</TargetWrapper>
			</Stack>
			<Text opacity={0.6} marginLeft={34}>
				~ 0 USD
			</Text>
		</Stack>
	);
};

export default WalletBalance;
