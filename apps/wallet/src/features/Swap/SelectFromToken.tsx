import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { TokenDocument } from '@walless/store';
import TokenList from 'features/Widget/BuiltInNetwork/TokenList';
import { useSnapshot, useTokens } from 'utils/hooks';

import { swapActions, swapContext } from './context';
import SelectModalHeader from './SelectModalHeader';

const SelectFromToken: FC = () => {
	const { network, fromToken } = useSnapshot(swapContext).swap;
	const { tokens } = useTokens(network);

	const handleBack = () => {
		swapActions.closeSelectToken('from');
	};

	const handleSelectToken = (token: TokenDocument) => {
		if (token._id != fromToken?._id) {
			swapActions.update({ fromToken: token, amount: '' });
		}
		swapActions.closeSelectToken('from');
	};

	return (
		<View style={styles.container}>
			<SelectModalHeader onBack={handleBack} />

			<TokenList
				itemStyle={styles.tokenStyle}
				separateStyle={styles.separateLineStyle}
				items={tokens}
				onPressItem={handleSelectToken}
			/>
		</View>
	);
};

export default SelectFromToken;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#131C24',
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 28,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	tokenStyle: {
		paddingHorizontal: 0,
	},
	separateLineStyle: {
		paddingHorizontal: 0,
	},
});
