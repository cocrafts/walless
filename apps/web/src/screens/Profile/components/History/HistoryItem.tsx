import { FC } from 'react';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

export interface HistoryItemProps {
	id: string;
	type: 'sent' | 'received';
	content: string;
}

const HistoryItem: FC<HistoryItemProps> = ({ type, content }) => {
	return (
		<Stack display="flex" flexDirection="row" gap={9}>
			<Stack
				marginTop={4}
				width={30}
				height={30}
				backgroundColor="#202D38"
				borderRadius={8}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				{type === 'sent' ? (
					<ArrowTopRight color="white" size={18} />
				) : (
					<ArrowBottomRight color="white" size={18} />
				)}
			</Stack>
			<Text>{content}</Text>
		</Stack>
	);
};

export default HistoryItem;
