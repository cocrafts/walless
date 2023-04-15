import { Image, Stack, Text } from '@walless/gui';

const AccountInfo = () => {
	const name = 'Baddie';
	return (
		<Stack flexDirection="row" alignItems="center" gap={16}>
			<Image
				src="/img/mock-avatar.png"
				width={50}
				height={50}
				borderRadius={10}
			/>
			<Text fontSize={20}>{name}</Text>
		</Stack>
	);
};

export default AccountInfo;
