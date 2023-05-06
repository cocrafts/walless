import { Twitter } from '@walless/icons';
import { Button, Stack, Text } from '@walless/ui';
import Image from 'next/image';

const SocialCard = () => {
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
					<Text fontWeight="500">Tweet</Text>
				</Button>
			</Stack>

			<Button backgroundColor="#0694D3" borderRadius={10}>
				Interested? Contact us
			</Button>
		</Stack>
	);
};

export default SocialCard;
