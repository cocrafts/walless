import { Copy } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

const CopiedAnnouncement = () => {
	return (
		<Stack
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			width={160}
			height={60}
			backgroundColor="#43525F"
			borderRadius={100}
			gap={8}
		>
			<Copy size={24} color="#FFFFFF" />
			<Text fontWeight="500" fontSize={16}>
				Copied
			</Text>
		</Stack>
	);
};

export default CopiedAnnouncement;
