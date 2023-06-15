import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type SlideOption, Slider } from '@walless/gui';
import { type ResponsePayload } from '@walless/messaging';
import { handleRequestSignature } from 'bridge/listeners';

import { type PayloadOptions } from '../shared';

import RequestSignatureApproval from './Approval';
import RequestSignaturePasscode from './Passcode';

export const RequestSignature = () => {
	const { requestId = '' } = useParams();
	const [activeIndex, setActiveIndex] = useState(0);
	const options = useRef<PayloadOptions>({
		requestId,
		isApproved: false,
		passcode: '',
	});

	const handleDenyRequest = () => {
		handleRequestSignature(options.current);
	};

	const handleApproveRequest = () => {
		options.current.isApproved = true;
		setActiveIndex(1);
	};

	const handleResovleRequest = async (
		passcode: string,
	): Promise<ResponsePayload> => {
		options.current.passcode = passcode;

		return await handleRequestSignature(options.current);
	};

	const sliderItems: SlideOption[] = [
		{
			id: 'approval',
			component: () => (
				<RequestSignatureApproval
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
					goBack={() => setActiveIndex(0)}
					onPasscodeComplete={handleResovleRequest}
				/>
			),
		},
	];

	return (
		<Slider
			style={{ flex: 1, justifyContent: 'flex-start' }}
			items={sliderItems}
			activeItem={sliderItems[activeIndex]}
		/>
	);
};

export default RequestSignature;
