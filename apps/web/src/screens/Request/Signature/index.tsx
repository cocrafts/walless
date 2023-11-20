import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { SlideOption } from '@walless/gui';
import { Slider } from '@walless/gui';
import type { RequestType, ResponsePayload } from '@walless/messaging';
import { PopupType } from '@walless/messaging';
import { handleRequestSignature } from 'bridge/listeners';
import { initializeKernelConnect } from 'utils/helper';
import { useRequestData } from 'utils/hooks';
import type { PayloadOptions } from 'utils/types';

import RequestSignatureApproval from './Approval';
import RequestSignaturePasscode from './Passcode';

export const RequestSignature = () => {
	const { requestId } = useParams();
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
