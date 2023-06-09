import { Book, Message, Shield, Window } from '@walless/icons';
import { Stack } from '@walless/ui';

import ForwardLink from './ForwardLink';

export const HelpCenter = () => {
	return (
		<Stack gap={12}>
			<Stack gap={8}>
				<ForwardLink
					link="https://discord.gg/uG2JEmTZXZ"
					title="Feedback to us"
					icon={<Message />}
				/>

				<ForwardLink
					link="https://discord.gg/3v7jwG45pe"
					title="Contact Support"
					icon={<Book />}
				/>

				<ForwardLink
					link="https://walless.io/privacy-policy"
					title="Privacy Policy"
					icon={<Shield size={16} />}
				/>

				<ForwardLink
					link="https://walless.io/"
					title="About Walless"
					icon={<Window />}
				/>
			</Stack>
		</Stack>
	);
};

export default HelpCenter;
