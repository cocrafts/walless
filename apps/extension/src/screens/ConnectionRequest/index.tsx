import Request from 'components/request';
import { requestType } from 'utils/config';

const rules = [
	{
		icon: '/img/request-screen/tick.png',
		description: 'View your wallet balance & activity',
	},
	{
		icon: '/img/request-screen/tick.png',
		description: 'Send you request approval for transaction',
	},
];
export const ConnectionRequest = () => {
	return (
		<Request
			type={requestType.connectionRequest}
			rules={rules}
			buttonPrimaryContent="Connect"
		/>
	);
};
