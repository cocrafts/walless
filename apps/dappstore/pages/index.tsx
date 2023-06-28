import { type FC } from 'react';
import { ScrollView } from 'react-native';
import { View } from '@walless/gui';
import { Footer, Header } from 'components/layouts';
import LayoutSection from 'features/LayoutSection';
import WalletCustomizeSection from 'features/WalletCustomizeSection';
import { sharedStyles } from 'utils/style';

const IndexPage: FC = () => {
	return (
		<View style={sharedStyles.minScreen}>
			<View style={sharedStyles.container}>
				<Header />
			</View>
			<ScrollView
				contentContainerStyle={sharedStyles.container}
				showsVerticalScrollIndicator={false}
			>
				<View style={sharedStyles.contentContainer}>
					<LayoutSection />

					<WalletCustomizeSection />
				</View>
			</ScrollView>
			<Footer />
		</View>
	);
};

export default IndexPage;
