import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import { defiList, gamesList } from './internal';
import Layouts from './Layouts';

const LayoutSection = () => {
	const [activeLayoutId, setActiveLayoutId] = useState<string | null>(null);

	return (
		<View style={styles.container}>
			<Layouts
				typeOfLayout="Defi"
				listOfLayouts={defiList}
				activeLayoutId={activeLayoutId}
				setActiveLayoutId={setActiveLayoutId}
			/>
			<Layouts
				typeOfLayout="Games"
				listOfLayouts={gamesList}
				activeLayoutId={activeLayoutId}
				setActiveLayoutId={setActiveLayoutId}
			/>
		</View>
	);
};

export default LayoutSection;

const styles = StyleSheet.create({
	container: {
		gap: 40,
	},
});
