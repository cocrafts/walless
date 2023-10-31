import type { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import type { Config, UserProfile } from '@walless/core';

import Header from './components/Header';

interface Props {
	profile: UserProfile;
	appConfig: Config;
}

export const WidgetExplorerFeat: FC<Props> = ({ profile, appConfig }) => {
	const { hideBalance } = appConfig;
	const { name } = profile;

	return (
		<SafeAreaView style={styles.container}>
			<Header userName={name} hideBalance={hideBalance} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	separatedLine: {
		borderBottomColor: '#24303a',
		borderBottomWidth: 1,
	},
});
