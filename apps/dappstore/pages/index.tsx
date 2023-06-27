import { type FC } from 'react';
import { ScrollView } from 'react-native';
import { View } from '@walless/gui';
import Navigation from 'components/layouts/Navigation';
import LayoutSection from 'features/LayoutSection';
import WalletCustomizeSection from 'features/WalletCustomizeSection';
import { sharedStyles } from 'utils/style';

const IndexPage: FC = () => {
	return (
		<View style={sharedStyles.minScreen}>
			<View style={sharedStyles.container}>
				<Navigation />
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
		</View>
	);
};

export default IndexPage;
