import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RequestType } from '@walless/core';
import { Networks, PopupType } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider } from '@walless/gui';
import type { ResponsePayload } from '@walless/messaging';
import { handleRequestSignature } from 'bridge';
import { initializeKernelConnect } from 'bridge/helpers';
import type { PayloadOptions } from 'bridge/utils';
import { usePublicKeys, useRequestData } from 'utils/hooks';
import type { RequestsParamList } from 'utils/navigation';

import RequestSignatureApproval from './Approval';
import RequestSignaturePasscode from './Passcode';

type Props = StackScreenProps<RequestsParamList, 'RequestSignature'>;

export const RequestSignature: FC<Props> = ({ route }) => {
	const { requestId } = route.params;
	const { sender, message, transaction, type } = useRequestData(
		requestId as string,
		PopupType.SIGNATURE_POPUP,
	);
	const [activeIndex, setActiveIndex] = useState(0);
	const options = useRef<PayloadOptions>({
		sourceRequestId: requestId as string,
		isApproved: false,
		passcode: '',
	});
	const publicKeys = usePublicKeys(Networks.solana)[0];

	const handleDenyRequest = useCallback(async () => {
		await handleRequestSignature(options.current, type as RequestType);
		window.close();
	}, [type]);

	const handleApproveRequest = () => {
		options.current.isApproved = true;
		setActiveIndex(1);
	};

	const handleResolveRequest = useCallback(
		async (passcode: string): Promise<ResponsePayload> => {
			options.current.passcode = passcode;
			return await handleRequestSignature(options.current, type as RequestType);
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
					onPasscodeComplete={handleResolveRequest}
				/>
			),
		},
	];

	useEffect(() => {
		initializeKernelConnect(`${PopupType.SIGNATURE_POPUP}/${requestId}`);
	}, []);

	return (
		<Slider
			style={{ flex: 1, justifyContent: 'flex-start' }}
			items={sliderItems}
			activeItem={sliderItems[activeIndex]}
		/>
	);
};

export default RequestSignature;
