import { FC } from 'react';
import { Input as WallessInput, Stack } from '@walless/gui';

interface Props {
	content: string;
	rightNode?: React.ReactNode;
	rightNodeContent?: number | string;
	onChangeText?: (text: string) => void;
}

const Input: FC<Props> = ({ content, rightNode, onChangeText }) => {
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
				borderWidth={0}
				paddingHorizontal={16}
				placeholder={content}
				placeholderTextColor="#566674"
				color="#FFFFFF"
				fontWeight="400"
				fontSize={14}
				focusStyle={{
					borderColor: '#49596A',
					borderWidth: 1,
				}}
				onChangeText={onChangeText}
			/>
		</Stack>
	);
};

export default Input;
