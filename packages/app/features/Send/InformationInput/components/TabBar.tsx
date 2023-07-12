import type { FC } from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';

interface Props {
	isTokensTab: boolean;
	setIsTokensTab: (isTokensTab: boolean) => void;
}

export const TabBar: FC<Props> = ({ isTokensTab, setIsTokensTab }) => {
	const activeButtonStyle = {
		...styles.button,
		backgroundColor: '#0694D3',
	};

	const activeButtonTitleStyle: TextStyle = {
		...styles.button,
		fontWeight: '600',
		color: '#FFFFFF',
	};

	return (
		<View style={styles.container}>
			<Button
				title="Tokens"
				style={isTokensTab ? activeButtonStyle : styles.button}
				titleStyle={isTokensTab ? activeButtonTitleStyle : styles.buttonTitle}
				onPress={() => setIsTokensTab(true)}
			/>

			<View style={styles.verticalLine} />

			<Button
				title="Collectibles"
				style={!isTokensTab ? activeButtonStyle : styles.button}
				titleStyle={!isTokensTab ? activeButtonTitleStyle : styles.buttonTitle}
				onPress={() => setIsTokensTab(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
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
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 32,
		borderRadius: 8,
		paddingVertical: 'auto',
		backgroundColor: 'transparent',
	},
	buttonTitle: {
		fontSize: 14,
		fontWeight: '500',
		color: '#566674',
	},
});
