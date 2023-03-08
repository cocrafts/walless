import { View } from '@walless/ui';

import Header from './Header';

const ConfirmTransaction = () => {
	return (
		<View className="w-full flex justify-between">
			<Header
				title="Confirm Transaction"
				returnLink="/send-token"
				className="mt-5"
			/>

			<View></View>
		</View>
	);
};

export default ConfirmTransaction;
