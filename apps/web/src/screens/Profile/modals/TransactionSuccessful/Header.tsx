import { Stack, Text } from '@walless/gui';
import { Times } from '@walless/icons';

const Header = () => {
	const handleClose = () => {
		console.log('close');
	};

	return (
		<Stack
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			marginHorizontal={20}
		>
			<Stack width={16} />

			<Text fontSize={14} fontWeight="500">
				Transaction successful
			</Text>

			<Stack onPress={handleClose}>
				<Times size={16} />
			</Stack>
		</Stack>
	);
};

export default Header;
