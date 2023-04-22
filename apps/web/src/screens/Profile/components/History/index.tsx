import { Stack, Text } from '@walless/ui';

import { mockHistory } from '../../internal';

import HistoryItem from './HistoryItem';

const History = () => {
	return (
		<Stack width="100%">
			<Stack
				marginBottom={16}
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text fontSize={18} fontWeight="500">
					History
				</Text>
			</Stack>

			{mockHistory.length === 0 ? (
				<Text textAlign="center" color="#566674">
					You don&apos;t have any transaction yet
				</Text>
			) : (
				<Stack
					backgroundColor="#131C24"
					paddingHorizontal={13}
					paddingVertical={22}
					borderRadius={12}
					display="flex"
					gap={12}
				>
					{mockHistory.map((item) => (
						<HistoryItem key={item.id} {...item} />
					))}
				</Stack>
			)}
		</Stack>
	);
};

export default History;
