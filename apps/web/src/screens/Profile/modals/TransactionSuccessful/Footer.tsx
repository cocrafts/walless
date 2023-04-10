import { Stack, Text } from '@walless/gui';

import NavBtn from '../SendToken/components/NavBtn';

const Footer = () => {
	return (
		<Stack
			marginTop="auto"
			marginHorizontal="auto"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			gap={8}
		>
			<NavBtn content="Back to home" route="/profile" />
			<Text fontSize={14} fontWeight="400">
				Other transaction
			</Text>
		</Stack>
	);
};

export default Footer;
