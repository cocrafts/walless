import { Button, Stack, Text } from '@walless/gui';
import { ChevronRight } from '@walless/icons';

const Title = () => {
	return (
		<Stack flexDirection="row" alignItems="center" gap={16}>
			<Button
				width={24}
				height={24}
				padding={0}
				borderRadius="100%"
				rotate="180deg"
				backgroundColor="#25313D"
				justifyContent="center"
				alignItems="center"
			>
				<ChevronRight size={18} />
			</Button>

			<Text fontSize={20}>Settings</Text>
		</Stack>
	);
};

export default Title;
