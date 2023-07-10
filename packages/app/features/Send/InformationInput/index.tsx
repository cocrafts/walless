import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';

import { showError } from '../utils';

import { CollectiblesTab, Header, TabBar, TokensTab } from './components';
import { totalCheckFieldsToContinue } from './internal';

interface Props {
	navigator: SliderHandle;
}

const InformationInput: FC<Props> = ({ navigator }) => {
	const [isTokensTab, setIsTokensTab] = useState(true);

	const handlePressContinue = () => {
		const checkedResult = totalCheckFieldsToContinue();

		if (!checkedResult.valid) {
			showError(checkedResult.message);
		} else {
			navigator.slideNext();
		}
	};

	return (
		<View style={styles.container}>
			<Header />

			<TabBar isTokensTab={isTokensTab} setIsTokensTab={setIsTokensTab} />

			{isTokensTab ? (
				<TokensTab onContinue={handlePressContinue} />
			) : (
				<CollectiblesTab />
			)}
		</View>
	);
};

export default InformationInput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 336,
	},
});
