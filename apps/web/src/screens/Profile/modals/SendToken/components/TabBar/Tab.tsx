import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

interface Props {
	name: string;
	isActive: boolean;
}

export const Tab: FC<Props> = ({ name, isActive }) => {
	return (
		<Stack
			display="flex"
			justifyContent="center"
			alignItems="center"
			width={158}
			height={32}
			borderRadius={8}
			backgroundColor={isActive ? '#0694D3' : 'transparent'}
		>
			<Text
				fontWeight={isActive ? '600' : '500'}
				fontSize={14}
				color={isActive ? '#FFFFFF' : '#566674'}
			>
				{name}
			</Text>
		</Stack>
	);
};

export default Tab;
