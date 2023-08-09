import type { FC } from 'react';
import { Text, View } from '@walless/gui';
import { Eye } from '@walless/icons';
import type { MetadataDocument } from '@walless/store';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import TargetWrapper from 'features/dashboard/EditTool/TargetWrapper';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

interface Props {
	token: MetadataDocument;
}

export const WalletBalance: FC<Props> = ({ token }) => {
	const { tools } = useSnapshot(appState);

	return (
		<View>
			<View>
				<Eye size={18} />
				<TargetWrapper isTargeted={tools.target === DetailTool.token}>
					<Text>0 {token?.symbol || 'XTZ'}</Text>
				</TargetWrapper>
			</View>
			<Text>~ 0 USD</Text>
		</View>
	);
};

export default WalletBalance;
