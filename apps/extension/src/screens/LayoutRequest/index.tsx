import Request from 'components/request';
import { requestType } from 'utils/config';

export const LayoutRequest = () => {
	return (
		<Request type={requestType.layoutRequest} buttonPrimaryContent="Accept" />
	);
};
