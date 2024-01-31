import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot, useTokens } from 'utils/hooks';

import { swapActions, swapContext } from './context';
import SelectModalHeader from './SelectModalHeader';

const SelectFromToken: FC = () => {
	const { network } = useSnapshot(swapContext).swap;
	const { tokens } = useTokens(network);

	const handleBack = () => {
		swapActions.closeSelectToken('from');
	};

	return (
		<View style={styles.container}>
			<SelectModalHeader onBack={handleBack} />

			{tokens.map((t) => {
				return <View key={t._id}></View>;
			})}
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
});
