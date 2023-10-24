import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SocialProps {
	image: string;
	url: string;
	size?: number;
}

const SocialCard: FC<SocialProps> = ({ image, url, size = 30 }) => {
	return (
		<Link href={url} target="_blank">
			<Image src={image} alt={image} height={size} width={size} />
		</Link>
	);
};

export default SocialCard;
