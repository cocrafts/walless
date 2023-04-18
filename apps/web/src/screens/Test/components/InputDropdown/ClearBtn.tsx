import { FC } from 'react';
import { Stack } from '@walless/gui';
import { Times } from '@walless/icons';

interface Props {
	onPress: () => void;
}

const ClearBtn: FC<Props> = ({ onPress }) => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			backgroundColor="#1E2830"
			width={16}
			height={16}
			borderRadius={16}
			cursor="pointer"
			onPress={onPress}
		>
			<Times size={12} color="#566674" />
		</Stack>
	);
};

export default ClearBtn;
