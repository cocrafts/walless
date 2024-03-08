import type { FC } from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';

import { txActions, useTransactionContext } from '../internal';

export const TabBar: FC = () => {
	const { type } = useTransactionContext();

	const activeButtonStyle = {
		...styles.button,
		backgroundColor: '#0694D3',
	};

	const activeButtonTitleStyle: TextStyle = {
		...styles.buttonTitle,
		fontWeight: '600',
		color: '#FFFFFF',
	};

	const titleStyle = (currentType: 'token' | 'nft') => {
		return type === currentType ? activeButtonTitleStyle : styles.buttonTitle;
	};
	const buttonStyle = (currentType: 'token' | 'nft') => {
		return type === currentType ? activeButtonStyle : styles.button;
	};

	return (
		<View style={styles.container}>
			<Button
				title="Tokens"
				style={buttonStyle('token')}
				titleStyle={titleStyle('token')}
				onPress={() => txActions.update({ type: 'token' })}
			/>

			<View style={styles.verticalLine} />

			<Button
				title="NFTs"
				style={buttonStyle('nft')}
				titleStyle={titleStyle('nft')}
				onPress={() => txActions.update({ type: 'nft' })}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#1E2830',
		padding: 6,
		borderRadius: 8,
		marginBottom: 18,
	},
	verticalLine: {
		width: 2,
		marginHorizontal: 4,
		backgroundColor: '#56667466',
	},
	button: {
		flex: 1,
		height: 32,
		borderRadius: 8,
		backgroundColor: 'transparent',
		paddingVertical: 0,
	},
	buttonTitle: {
		fontSize: 14,
		fontWeight: '500',
		color: '#566674',
	},
});
