import { Twitter } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

import ForwardLink from './ForwardLink';

export const FollowUs = () => {
	return (
		<Stack gap={12}>
			<Text fontSize={14} color="#566674">
				Follow Us
			</Text>

			<Stack gap={8}>
				<ForwardLink
					link="https://twitter.com/walless_wallet"
					title="Follow us on Twitter"
					icon={<Twitter color="#0694D3" />}
					iconBackground="#243F56"
				/>
			</Stack>
		</Stack>
	);
};

export default FollowUs;
