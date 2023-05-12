import { Linking } from 'react-native';
import { Twitter } from '@walless/icons';
import { Anchor, Button, Stack, Text } from '@walless/ui';
import Image from 'next/image';

const SocialCard = () => {
	const tweetContent = [
		'We just bring our UI elements onto this web3 wallet @walless_wallet with only a few clicks.',
		'This demo shows how seamless the UI of wallet to our app! 🔥',
		'Want to customize a wallet layout to your own brand?\n👉🌐 https://walless.io/',
		'', // empty line to separate the content and hashtags
	];

	const tweetHastags = ['web3wallet', 'Solana', 'Solanawallet'];

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
