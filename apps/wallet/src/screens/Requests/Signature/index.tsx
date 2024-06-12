import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Networks, PopupType } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider } from '@walless/gui';
import { handleRequestSignature } from 'bridge';
import { initializeKernelConnect } from 'bridge/helpers';
import type { PayloadOptions } from 'bridge/utils';
import { usePublicKeys, useRequestData } from 'utils/hooks';
import type { RequestsParamList } from 'utils/navigation';

import RequestSignatureApproval from './Approval';
import RequestSignaturePasscode from './Passcode';

type Props = StackScreenProps<RequestsParamList, 'RequestSignature'>;

export const RequestSignature: FC<Props> = ({ route }) => {
	const { resolveId } = route.params;
	const { sender, message, transaction, type, network } = useRequestData(
		resolveId as string,
		PopupType.SIGNATURE_POPUP,
	);
	const [activeIndex, setActiveIndex] = useState(0);
	const options = useRef<PayloadOptions>({
		sourceRequestId: resolveId as string,
		isApproved: false,
		passcode: '',
		network,
	});
	const publicKeys = usePublicKeys(Networks.solana)[0];

	const handleDenyRequest = useCallback(async () => {
		await handleRequestSignature(options.current);
		window.close();
	}, [type]);

	const handleApproveRequest = () => {
		options.current.isApproved = true;
		setActiveIndex(1);
	};

	const handleResolveRequest = useCallback(
		async (passcode: string) => {
			options.current.passcode = passcode;
			options.current.network = network;
			const res = await handleRequestSignature(options.current);
			return res;
		},
		[type],
	);

	const sliderItems: SlideOption[] = [
		{
			id: 'approval',
			component: () => (
				<RequestSignatureApproval
					wallet={publicKeys._id}
					sender={sender}
					content={message || transaction}
					onDeny={handleDenyRequest}
					onApprove={handleApproveRequest}
				/>
			),
		},
		{
			id: 'passcode',
			component: () => (
				<RequestSignaturePasscode
					activeId={activeIndex}
					onPasscodeComplete={handleResolveRequest as never}
				/>
			),
		},
	];

	useEffect(() => {
		initializeKernelConnect(PopupType.SIGNATURE_POPUP + '/' + resolveId);
	}, []);

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			items={sliderItems}
			activeItem={sliderItems[activeIndex]}
		/>
	);
};

export default RequestSignature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	slideContainer: {
		paddingHorizontal: 10,
	},
});
