import { Stack } from '@walless/gui';
import {
	Discord,
	Github,
	LinkedIn,
	Mail,
	Twitter,
	Youtube,
} from '@walless/icons';

import SocialIcon from './SocialIcon';

const SocialIcons = () => {
	return (
		<Stack flexDirection="row" justifyContent="center" gap={28} flexWrap="wrap">
			<SocialIcon
				size={48}
				link="https://discord.gg/2bzf9qjuN3"
				icon={<Discord size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://discord.gg/2bzf9qjuN3"
				icon={<Twitter size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://discord.gg/2bzf9qjuN3"
				icon={<Github size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://discord.gg/2bzf9qjuN3"
				icon={<LinkedIn size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://discord.gg/2bzf9qjuN3"
				icon={<Youtube size={40} />}
			/>

			<SocialIcon
				size={48}
				link="https://discord.gg/2bzf9qjuN3"
				icon={<Mail size={40} />}
			/>
		</Stack>
	);
};

export default SocialIcons;
