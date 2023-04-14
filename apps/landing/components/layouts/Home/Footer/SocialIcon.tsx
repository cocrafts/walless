import { FC, ReactNode } from 'react';
import { Stack } from '@walless/gui';
import Link from 'next/link';

interface Props {
	size: number;
	icon: ReactNode;
	link: string;
}

const SocialIcon: FC<Props> = ({ size, link, icon }) => {
	return (
		<Stack
			backgroundColor="#202D38"
			justifyContent="center"
			alignItems="center"
			borderRadius="100%"
			width={size}
			height={size}
		>
			<Link href={link} target="_blank">
				{icon}
			</Link>
		</Stack>
	);
};

export default SocialIcon;
