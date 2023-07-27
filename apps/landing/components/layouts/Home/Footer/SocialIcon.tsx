import type { FC, ReactNode } from 'react';
import { Button } from '@walless/ui';
import Link from 'next/link';

interface Props {
	size: number;
	icon: ReactNode;
	link: string;
}

const SocialIcon: FC<Props> = ({ size, link, icon }) => {
	return (
		<Link href={link} target="_blank">
			<Button
				padding={0}
				backgroundColor="#202D38"
				justifyContent="center"
				alignItems="center"
				borderRadius="100%"
				width={size}
				height={size}
			>
				{icon}
			</Button>
		</Link>
	);
};

export default SocialIcon;
