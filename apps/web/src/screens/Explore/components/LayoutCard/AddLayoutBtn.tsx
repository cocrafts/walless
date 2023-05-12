import { type FC } from 'react';
import { Plus } from '@walless/icons';
import { Button } from '@walless/ui';

interface Props {
	handleAddLayout: () => void;
}

const AddLayoutBtn: FC<Props> = ({ handleAddLayout }) => {
	return (
		<Button
			paddingVertical={8}
			paddingHorizontal={8}
			borderRadius={10}
			onPress={handleAddLayout}
		>
			<Plus size={14} />
		</Button>
	);
};

export default AddLayoutBtn;
