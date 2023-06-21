import { type FC } from 'react';
import { ScrollView } from 'react-native';
import { dimensionState, View } from '@walless/gui';
import { Footer, Header } from 'components/layouts';
import { sharedStyles } from 'utils/style';
import { useSnapshot } from 'valtio';

const IndexPage: FC = () => {
	const snap = useSnapshot(dimensionState);
	console.log('Is mobile', snap.isMobile);

	return (
		<View style={sharedStyles.minScreen}>
			<View style={sharedStyles.container}>
				<Header />
			</View>
			<ScrollView
				contentContainerStyle={sharedStyles.container}
				showsVerticalScrollIndicator={false}
			></ScrollView>
			<Footer />
		</View>
	);
};

export default IndexPage;
