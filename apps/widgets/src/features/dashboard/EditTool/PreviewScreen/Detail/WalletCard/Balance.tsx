import type { FC } from 'react';
import { StyleSheet } from 'react-native';
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
		<View style={styles.container}>
			<View horizontal style={styles.topContainer}>
				<Eye size={18} />
				<TargetWrapper isTargeted={tools.target === DetailTool.token}>
					<Text style={styles.token}>0 {token?.symbol || 'XTZ'}</Text>
				</TargetWrapper>
			</View>
			<Text style={styles.price}>~ 0 USD</Text>
		</View>
	);
};

export default WalletBalance;

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
	},
	topContainer: {
		alignItems: 'center',
		gap: 10,
	},
	token: {
		fontSize: 35,
		fontWeight: '500',
		color: '#ffffff',
	},
	price: {
		marginLeft: 28,
	},
});
