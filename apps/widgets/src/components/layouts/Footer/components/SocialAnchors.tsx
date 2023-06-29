import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';
import {
	Discord,
	Github,
	LinkedIn,
	Mail,
	Twitter,
	Youtube,
} from '@walless/icons';
import { type IconProps } from '@walless/icons/components/types';
import Link from 'next/link';

interface ISocialAnchorsProps {
	icon: FC<IconProps>;
	link: string;
}

const SocialAnchor: FC<ISocialAnchorsProps> = ({ icon: Icon, link }) => {
	return (
		<Link href={link}>
			<Button style={styles.button}>
				<Icon size={40} />
			</Button>
		</Link>
	);
};

const socialAnchors: ISocialAnchorsProps[] = [
	{
		icon: Discord,
		link: 'https://discord.gg/2bzf9qjuN3',
	},
	{
		icon: Twitter,
		link: 'https://twitter.com/walless_wallet',
	},
	{
		icon: Github,
		link: 'https://github.com/cocrafts/walless',
	},
	{
		icon: LinkedIn,
		link: 'https://www.linkedin.com/company/wallessio/',
	},
	{
		icon: Youtube,
		link: 'https://www.youtube.com/@Wallesslabs',
	},
	{
		icon: Mail,
		link: 'mailto:hello@walless.io',
	},
];

const SocialAnchors = () => {
	return (
		<View style={styles.container}>
			{socialAnchors.map((anchor, index) => (
				<SocialAnchor key={index} {...anchor} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 12,
		flexWrap: 'wrap',
	},
	button: {
		backgroundColor: '#202D38',
		paddingHorizontal: 4,
		paddingVertical: 4,
		borderRadius: 100,
	},
});

export default SocialAnchors;
