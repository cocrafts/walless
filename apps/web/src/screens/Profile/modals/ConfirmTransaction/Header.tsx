import { Stack, Text } from '@walless/gui';
import { ChevronRight, Times } from '@walless/icons';
import { router } from 'utils/routing';

const Header = () => {
	const handleGoBack = () => {
		router.navigate('/send');
	};

	const handleClose = () => {
		console.log('close');
	};

	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Stack
				rotate="180deg"
				width={24}
				height={24}
				backgroundColor="#25313D"
				borderRadius="100%"
				display="flex"
				justifyContent="center"
				alignItems="center"
				onPress={handleGoBack}
			>
				<ChevronRight size={16} />
			</Stack>

			<Text fontSize={14} fontWeight="500">
				Confirm transaction
			</Text>

			<Stack onPress={handleClose}>
				<Times size={16} />
			</Stack>
		</Stack>
	);
};

export default Header;
