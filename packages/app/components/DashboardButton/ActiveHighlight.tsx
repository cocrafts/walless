import { Stack } from '@walless/ui';

export const ActiveHighlight = () => {
	return (
		<Stack position="absolute" top={10} bottom={10} left={0}>
			<Stack
				flex={1}
				width={2}
				backgroundColor="#FFFFFF"
				borderTopRightRadius={5}
				borderBottomRightRadius={5}
			/>
		</Stack>
	);
};

export default ActiveHighlight;
