import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { UnknownObject } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider } from '@walless/gui';
import type {
	MessagePayload,
	RequestType,
	ResponsePayload,
} from '@walless/messaging';
import { PopupType } from '@walless/messaging';
import {
	getDataFromSourceRequest,
	handleRequestSignature,
} from 'bridge/listeners';
import { initializeKernelConnect } from 'utils/helper';
import type { PayloadOptions } from 'utils/types';

import RequestSignatureApproval from './Approval';
import RequestSignaturePasscode from './Passcode';

export const RequestSignature = () => {
	const { requestId = '' } = useParams();
	const [activeIndex, setActiveIndex] = useState(0);
	const [payload, setPayload] = useState<MessagePayload>({});
	const [sender, setSender] = useState<UnknownObject>({});
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
					sender={sender}
					content={payload.message || payload.transaction}
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
		getDataFromSourceRequest(requestId).then((result) => {
			setPayload(result as MessagePayload);
			setSender(result?.sender);
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
