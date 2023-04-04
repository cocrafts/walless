import { Button, ChevronDown, Image, Stack, Text } from '@walless/gui';

const iconSize = 45;

export const HeaderRequest = () => {
	const iconSrc = { uri: '/img/icon-lg.png' };

	return (
		<Stack
			horizontal
			alignItems="center"
			backgroundColor="#121B22"
			paddingHorizontal={15}
			paddingVertical={5}
		>
			<Image src={iconSrc} width={iconSize} height={iconSize} />
			<Stack horizontal flex={1} justifyContent="center" alignItems="center">
				<Text textAlign="center" fontWeight={'300'}>
					Zbz thic...
				</Text>
				<Button backgroundColor="transparent" padding={5}>
					<ChevronDown size={20} />
				</Button>
			</Stack>
			<Stack width={iconSize} />
		</Stack>
	);
};
