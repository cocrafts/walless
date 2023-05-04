import { Plus } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

const LayoutCardBottomPart = () => {
	return (
		<Stack
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			marginTop={6}
			marginBottom={10}
		>
			<Stack display="flex" flexDirection="row" gap={11}>
				<Stack
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					gap={4}
				>
					<Text fontWeight="400" fontSize={10}>
						♥ 100 Love
					</Text>
				</Stack>

				<Stack
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					gap={4}
				>
					<Stack
						width={8}
						height={8}
						borderRadius="100%"
						backgroundColor="#4DE2A4"
					/>
					<Text fontWeight="400" fontSize={10}>
						200 Active
					</Text>
				</Stack>
			</Stack>

			<Stack
				backgroundColor="#0694D3"
				width={24}
				height={24}
				alignItems="center"
				justifyContent="center"
				borderRadius={8}
			>
				<Plus size={12} />
			</Stack>
		</Stack>
	);
};

export default LayoutCardBottomPart;
