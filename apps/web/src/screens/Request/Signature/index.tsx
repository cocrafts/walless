import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type SlideOption, Slider } from '@walless/gui';
import {
	type MessagePayload,
	type RequestType,
	type ResponsePayload,
	PopupType,
} from '@walless/messaging';
import {
	getMessageOrTransaction,
	handleRequestSignature,
} from 'bridge/listeners';
import { initializeKernelConnect } from 'utils/helper';

import { type PayloadOptions } from '../shared';

import RequestSignatureApproval from './Approval';
import RequestSignaturePasscode from './Passcode';

export const RequestSignature = () => {
	const { requestId = '' } = useParams();
	const [activeIndex, setActiveIndex] = useState(0);
	const [payload, setPayload] = useState<MessagePayload>();
	const options = useRef<PayloadOptions>({
		sourceRequestId: requestId,
		isApproved: false,
		passcode: '',
	});

	const handleDenyRequest = useCallback(async () => {
		handleRequestSignature(options.current, payload?.type as RequestType);
	}, [payload]);

	const handleApproveRequest = () => {
		options.current.isApproved = true;
		setActiveIndex(1);
	};

	const handleResolveRequest = useCallback(
		async (passcode: string): Promise<ResponsePayload> => {
			options.current.passcode = passcode;

			return await handleRequestSignature(
				options.current,
				payload?.type as RequestType,
			);
		},
		[payload],
	);

	const sliderItems: SlideOption[] = [
		{
			id: 'approval',
			component: () => (
				<RequestSignatureApproval
					content={payload?.message || payload?.transaction}
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

	useEffect(() => {
		getMessageOrTransaction(requestId).then((result) => {
			setPayload(result as MessagePayload);
		});
	}, [requestId]);

	return (
		<Slider
			style={{ flex: 1, justifyContent: 'flex-start' }}
			items={sliderItems}
			activeItem={sliderItems[activeIndex]}
		/>
	);
};

export default RequestSignature;
