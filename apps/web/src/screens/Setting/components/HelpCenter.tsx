import { Book, Message, Window } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

import ForwardLink from './ForwardLink';

const HelpCenter = () => {
	return (
		<Stack gap={12}>
			<Text fontSize={14} color="#566674">
				Help Center
			</Text>

			<Stack gap={8}>
				<ForwardLink
					link="https://discord.gg/3v7jwG45pe"
					title="Contact Support"
					icon={<Message />}
				/>

				<ForwardLink
					link="https://walless.io/privacy-policy"
					title="Privacy Policy"
					icon={<Book />}
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
