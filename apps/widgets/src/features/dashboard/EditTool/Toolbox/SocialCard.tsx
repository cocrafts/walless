import { Linking } from 'react-native';
import { Anchor, Button, Text, View } from '@walless/gui';
import { Twitter } from '@walless/icons';
import Image from 'next/image';

const SocialCard = () => {
	const tweetContent = [
		"I just created our own Dapp/ Game's UI elements into a crypto wallet with @walless_wallet.",
		'I can custom everything from color, logo, banner,...',
		'This no-code wallet tool makes our dev work so much easier.',
		'Try Walless now 👉 https://walless.io/',
		'', // empty line to separate the content and hashtags
	];

	const tweetHashTags = ['web3wallet', 'Solana', 'wallet'];

	const tweetShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		tweetContent.join('\n\n'),
	)}&hashtags=${encodeURIComponent(tweetHashTags.join(','))}
		`;

	const handleContact = () => {
		return Linking.openURL('https://forms.gle/UypLEFvZsc1BxAXdA');
	};

	return (
		<View
			style={{
				alignSelf: 'center',
				backgroundColor: '#172028',
				gap: 12,
				width: 320,
				padding: 16,
				borderRadius: 10,
			}}
		>
			<View horizontal>
				<View horizontal>
					<Image
						src="/img/walless-online.png"
						alt="Walless chat bubble"
						width={36}
						height={36}
					/>
					<Text>Share your layout to community</Text>
				</View>

				<Button>
					<Twitter size={16} />
					<Anchor href={tweetShare} target="_blank">
						Tweet
					</Anchor>
				</Button>
			</View>

			<Button onPress={handleContact}>
				<Text>Interested? Contact us</Text>
			</Button>
		</View>
	);
};

export default SocialCard;
