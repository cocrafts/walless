import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RequestType } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import type { aptosHandler } from '@walless/network';
import { showRequirePasscodeModal } from 'modals/RequirePasscode';
import { handleAptosOnChainAction } from 'utils/transaction';

interface Props {
	pubkey: string;
	directTransfer: boolean;
	fee: number;
}

const indicatorSize = 16;

const DirectTransfer: FC<Props> = ({ pubkey, directTransfer, fee }) => {
	const [disabled, setDisabled] = useState(false);

	const handleOnPasscodeComplete = async (passcode: string) => {
		const payload: aptosHandler.AptosDirectTransferPayload = {
			pubkey,
			directTransfer: !directTransfer,
		};

		const res = await handleAptosOnChainAction({
			passcode,
			type: RequestType.UPDATE_DIRECT_TRANSFER_ON_APTOS,
			payload,
		});
		return res;
	};

	const handleDirectTransfer = async () => {
		showRequirePasscodeModal({
			title: `Turn ${directTransfer ? 'off' : 'on'} direct transfer`,
			desc: `Toggle this flag will submit an on-chain transaction and will require a ${fee} APT gas fee.`,
			onPasscodeComplete: handleOnPasscodeComplete,
			onActionComplete: () => {
				setDisabled(true);
			},
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Allow direct transfer</Text>

			<Hoverable
				style={[
					styles.statusContainer,
					{
						backgroundColor: directTransfer ? '#0694D3' : '#566674',
						alignItems: directTransfer ? 'flex-end' : 'flex-start',
					},
				]}
				onPress={handleDirectTransfer}
				disabled={disabled}
			>
				<View style={styles.statusIndicator} />
			</Hoverable>
		</View>
	);
};

export default DirectTransfer;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
	},
	text: {
		color: 'white',
		fontWeight: '500',
		fontSize: 16,
	},
	statusContainer: {
		padding: indicatorSize / 4,
		minWidth: indicatorSize * 2 + indicatorSize / 2,
		borderRadius: 1000,
		backgroundColor: '#566674',
	},
	statusIndicator: {
		width: indicatorSize,
		height: indicatorSize,
		borderRadius: 10,
		backgroundColor: 'white',
	},
});
