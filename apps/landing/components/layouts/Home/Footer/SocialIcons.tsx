import {
	Discord,
	Github,
	LinkedIn,
	Mail,
	Twitter,
	Youtube,
} from '@walless/icons';
import { Stack } from '@walless/ui';

import SocialIcon from './SocialIcon';

const SocialIcons = () => {
	return (
		<Stack
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			gap={12}
			flexWrap="wrap"
		>
			<SocialIcon
				size={48}
				link="https://discord.gg/2bzf9qjuN3"
				icon={<Discord size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://twitter.com/walless_wallet"
				icon={<Twitter size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://github.com/cocrafts/walless"
				icon={<Github size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://www.linkedin.com/company/wallessio/"
				icon={<LinkedIn size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://www.youtube.com/@Wallesslabs"
				icon={<Youtube size={40} />}
			/>

			<SocialIcon
				size={48}
				link="mailto:hello@walless.io"
				icon={<Mail size={40} />}
			/>
		</Stack>
	);
};

export default SocialIcons;
