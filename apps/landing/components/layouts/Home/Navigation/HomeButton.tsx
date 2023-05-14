import { type FC } from 'react';
import { Button, Image } from '@walless/ui';
import Anchor from 'components/Anchor';
import { resources } from 'utils/config';

export const HomeButton: FC = () => {
	return (
		<Anchor href="/">
			<Button transparent horizontal alignItems="center">
				<Image
					src={resources.walless.icon}
					defaultSource={resources.walless.icon}
					height={25}
					width={50}
					resizeMode="contain"
				/>
				<Image
					defaultSource={resources.walless.text}
					src={resources.walless.text}
					height={18}
					width={100}
					marginLeft={12}
					resizeMode="contain"
				/>
			</Button>
		</Anchor>
	);
};

export default HomeButton;
