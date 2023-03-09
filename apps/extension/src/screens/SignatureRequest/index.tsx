import Request from 'components/request';
import { requestType } from 'utils/config';

export const SignatureRequest = () => {
	return (
		<Request
			type={requestType.signatureRequest}
			buttonPrimaryContent="Sign and Approve"
		/>
	);
};
