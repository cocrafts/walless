import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { type SliderHandle, View } from '@walless/gui';

import { CollectiblesTab, Header, TabBar, TokensTab } from './components';

interface Props {
	navigator: SliderHandle;
}

const InformationInput: FC<Props> = ({ navigator }) => {
	const [isTokensTab, setIsTokensTab] = useState(true);

	const handlePressContinue = () => {
		navigator.slideNext();
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
