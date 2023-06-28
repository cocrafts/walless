import { type FC, type ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { View } from '@walless/gui';
import { sharedStyles } from 'utils/style';

import { Footer, Header } from '.';

interface Props {
	children: ReactNode;
}

export const HomeLayout: FC<Props> = ({ children }) => {
	return (
		<View style={sharedStyles.minScreen}>
			<View style={sharedStyles.container}>
				<Header />
			</View>
			<ScrollView
				contentContainerStyle={sharedStyles.contentContainer}
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
			<Footer />
		</View>
	);
};

export default HomeLayout;
