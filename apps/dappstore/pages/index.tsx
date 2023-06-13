import { type FC } from 'react';
import { ScrollView } from 'react-native';
import { View } from '@walless/gui';
import Navigation from 'components/layouts/Navigation';
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
			></ScrollView>
		</View>
	);
};

export default IndexPage;
