import { ChevronDown } from '@walless/icons';
import { Button, Image, Stack, Text } from '@walless/ui';

const iconWidth = 40;
const iconHeight = iconWidth / 2;

export const HeaderRequest = () => {
	const iconSrc = { uri: '/img/bare-icon.png' };

	return (
		<Stack
			horizontal
			alignItems="center"
			backgroundColor="#121B22"
			paddingHorizontal={15}
			paddingVertical={10}
		>
			<Image src={iconSrc} width={iconWidth} height={iconHeight} />
			<Stack horizontal flex={1} justifyContent="center" alignItems="center">
				<Text textAlign="center" fontWeight={'300'}>
					Zbz thic...
				</Text>
				<Button backgroundColor="transparent" padding={5}>
					<ChevronDown size={20} />
				</Button>
			</Stack>
			<Stack width={iconWidth} />
		</Stack>
	);
};
