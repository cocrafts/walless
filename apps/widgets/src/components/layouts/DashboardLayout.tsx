import { type FC, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { sharedStyles } from 'utils/style';

import { Header } from '.';

interface Props {
	children: ReactNode;
}

export const DashboardLayout: FC<Props> = ({ children }) => {
	return (
		<View style={{ ...sharedStyles.minScreen, ...styles.container }}>
			<Header />
			<View style={{ ...sharedStyles.container, ...styles.contentContainer }}>
				{children}
			</View>
		</View>
	);
};

export default DashboardLayout;

const styles = StyleSheet.create({
	container: {},
	contentContainer: {
		paddingHorizontal: 40,
		paddingVertical: 20,
	},
});
