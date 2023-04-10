import { FC, useState } from 'react';
import { Input as WallessInput, Stack, Text } from '@walless/gui';

interface Props {
	content: string;
	rightNode?: React.ReactNode;
	rightNodeContent?: number | string;
}

const Input: FC<Props> = ({ content, rightNode }) => {
	const [isActive, setIsActive] = useState(false);
	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Stack display="flex" justifyContent="center">
				{rightNode}
			</Stack>
			<WallessInput
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				backgroundColor="#0E141A"
				width={336}
				height={48}
				borderRadius={15}
				borderColor={isActive ? '#49596A' : 'transparent'}
				borderWidth={isActive ? 1 : 0}
				paddingHorizontal={16}
				placeholder={content}
				placeholderTextColor="#566674"
				color="#FFFFFF"
				fontWeight="400"
				fontSize={14}
			/>
		</Stack>
	);
};

export default Input;
