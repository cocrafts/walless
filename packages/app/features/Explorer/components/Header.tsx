import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, View } from '@walless/gui';
import { Search } from '@walless/icons';

import { sharedStyle } from '../shared';

import TotalBalance from './TotalBalance';

interface Props {
	hideBalance: boolean;
	userName?: string;
	totalBalance?: number;
}

export const Header: FC<Props> = ({ hideBalance, userName, totalBalance }) => {
	return (
		<View
			horizontal
			style={[
				sharedStyle.componentContainer,
				styles.container,
				styles.separatedLine,
			]}
		>
			<TotalBalance
				userName={userName}
				hideBalance={hideBalance}
				totalBalance={totalBalance}
			/>
			<Hoverable style={styles.searchButton}>
				<Search color="#566674" />
			</Hoverable>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	separatedLine: {
		borderBottomColor: '#24303a',
		borderBottomWidth: 1,
	},
	searchButton: {
		padding: 10,
		backgroundColor: '#23303c',
		borderRadius: 10,
	},
});
