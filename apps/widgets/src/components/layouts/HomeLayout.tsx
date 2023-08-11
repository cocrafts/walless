import { type FC, type ReactNode } from 'react';
import { View } from '@walless/gui';
import { sharedStyles } from 'utils/style';

import { Footer, Header } from '.';

interface Props {
	children: ReactNode;
}

export const HomeLayout: FC<Props> = ({ children }) => {
	return (
		<View style={sharedStyles.minScreen}>
			<Header />
			<View style={sharedStyles.contentContainer}>{children}</View>
			<Footer />
		</View>
	);
};

export default HomeLayout;
