import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import RequirePasscodeModal from '@walless/app/modals/RequirePasscode';
import {
	BindDirections,
	Hoverable,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { RequestType } from '@walless/messaging';
import { encryptedMessenger } from 'bridge/utils/messaging';

interface Props {
	pubkey: string;
	directTransfer: boolean;
	fee: number;
}

const indicatorSize = 16;

const DirectTransfer: FC<Props> = ({ pubkey, directTransfer, fee }) => {
	const [disabled, setDisabled] = useState(false);

	const handleDirectTransfer = async () => {
		modalActions.show({
			component: () => (
				<RequirePasscodeModal
					title={`Turn ${directTransfer ? 'off' : 'on'} direct transfer`}
					description={`Toggle this flag will submit an on-chain transaction and will require a ${fee} APT gas fee.`}
					onPasscodeComplete={async (passcode) => {
						const res = await encryptedMessenger.request('kernel', {
							type: RequestType.UPDATE_APTOS_DIRECT_TRANSFER,
							transaction: JSON.stringify({
								pubkey,
								directTransfer: !directTransfer,
							}),
							passcode,
						});
						return res;
					}}
					onActionComplete={() => {
						modalActions.hide('passcode');
						setDisabled(true);
					}}
				/>
			),
			id: 'passcode',
			bindingDirection: BindDirections.InnerBottom,
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
