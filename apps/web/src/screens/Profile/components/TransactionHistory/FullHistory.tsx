import { TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { useHistory } from 'utils/hooks';

import HistoryItem from './HistoryItem';

const FullHistory = () => {
	const history = useHistory();

	return (
		<View>
			<View>
				<TouchableOpacity>
					<ChevronLeft />
				</TouchableOpacity>
				<Text>Transaction History</Text>
			</View>
			<View>
				{history.map((transaction) => (
					<HistoryItem key={transaction.signature} {...transaction} />
				))}
			</View>
		</View>
	);
};

export default FullHistory;
