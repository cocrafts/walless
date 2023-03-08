import { Text, View } from '@walless/ui';

import ConfirmButton from './ConfirmButton';
import Header from './Header';
import InfoTable, { InfoDisplayProps } from './InfoTable';

const data: InfoDisplayProps[] = [
	{
		heading1: <Text>From account</Text>,
		heading2: <Text>Network</Text>,
		content: <Text>0x1234567890</Text>,
	},
	{
		heading1: <Text>From account</Text>,
		heading2: <Text>Network</Text>,
		content: <Text>0x1234567890</Text>,
	},
];

const ConfirmTransaction = () => {
	return (
		<View className="w-full h-full flex justify-between py-5">
			<Header title="Confirm Transaction" returnLink="/send-token" />

			<View className="flex gap-3 mx-6">
				<InfoTable data={data} />
				<InfoTable data={data} />
			</View>

			<ConfirmButton text="Confirm" disable={false} />
		</View>
	);
};

export default ConfirmTransaction;
