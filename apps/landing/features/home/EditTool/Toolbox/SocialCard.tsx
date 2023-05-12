import { Linking } from 'react-native';
import { Twitter } from '@walless/icons';
import { Anchor, Button, Stack, Text } from '@walless/ui';
import Image from 'next/image';

const SocialCard = () => {
	const tweetContent = [
		"I just created our own Dapp/ Game's UI elements into a crypto wallet with @walless_wallet.",
		'I can custom everything from color, logo, banner,...',
		'This no-code wallettool makes our dev work so much easier.',
		'Try Walless now 👉 https://walless.io/',
		'', // empty line to separate the content and hashtags
	];

	const tweetHastags = ['web3wallet', 'Solana'];

	const tweetShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		tweetContent.join('\n\n'),
	)}&hashtags=${encodeURIComponent(tweetHastags.join(','))}
		`;

	const handleContact = () =>
		Linking.openURL('https://forms.gle/UypLEFvZsc1BxAXdA');

	return (
		<Stack
			backgroundColor="#172028"
			width={320}
			padding={16}
			borderRadius={10}
			gap={12}
		>
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Stack flexDirection="row" alignItems="center" gap={10}>
					<Image
						src="/img/walless-online.png"
						alt="Walless chat bubble"
						width={36}
						height={36}
					/>
					<Text fontSize={10} width={120} wordWrap="break-word">
						Share your layout to community
					</Text>
				</Stack>

				<Button
					borderWidth={1}
					borderColor="#566674"
					backgroundColor="transparent"
					flexDirection="row"
					alignItems="center"
					gap={4}
				>
					<Twitter size={16} />
					<Anchor href={tweetShare} target="_blank" color="white">
						Tweet
					</Anchor>
				</Button>
			</Stack>

			<Button
				backgroundColor="#0694D3"
				borderRadius={10}
				onPress={handleContact}
			>
				<Text>Interested? Contact us</Text>
			</Button>
		</Stack>
	);
};

export default SocialCard;
