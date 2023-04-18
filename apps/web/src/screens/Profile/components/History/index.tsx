import { Stack, Text } from '@walless/ui';

import { mockHistory } from '../../internal';
import SeeAllBtn from '../SeeAllBtn';

import HistoryItem from './HistoryItem';

const History = () => {
	const handlePressSeeAll = () => {
		console.log('See All');
	};

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
				<SeeAllBtn onPress={handlePressSeeAll} />
			</Stack>

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
		</Stack>
	);
};

export default History;
