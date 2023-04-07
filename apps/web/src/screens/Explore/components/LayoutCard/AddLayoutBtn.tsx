import { FC } from 'react';
import { Stack } from '@walless/gui';
import { Plus } from '@walless/icons';

interface Props {
	handleAddLayout: () => void;
}
const AddLayoutBtn: FC<Props> = ({ handleAddLayout }) => {
	return (
		<Stack
			height={30}
			width={30}
			backgroundColor="#0694D3"
			borderRadius={8}
			display="flex"
			alignItems="center"
			justifyContent="center"
			onPress={handleAddLayout}
		>
			<Plus size={14} />
		</Stack>
	);
};

export default AddLayoutBtn;
