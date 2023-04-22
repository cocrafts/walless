import { type FC, type ReactNode } from 'react';
import { type ViewStyle, ScrollView, StyleSheet } from 'react-native';
import { UserProfile } from '@walless/core';
import { View } from '@walless/gui';
import { ExtensionDocument } from '@walless/store';

import Navigator from './Navigator';

interface Props {
	style?: ViewStyle;
	children?: ReactNode;
	navigatorSize?: number;
	profile: UserProfile;
	extensions: ExtensionDocument[];
	getIsExtensionActive?: (item: ExtensionDocument) => boolean;
	onExtensionPress?: (item: ExtensionDocument) => void;
}

export const DashboardLayout: FC<Props> = ({
	style,
	children,
	navigatorSize,
	profile,
	extensions,
	getIsExtensionActive,
	onExtensionPress,
}) => {
	return (
		<View style={[styles.container, style]}>
			<Navigator
				size={navigatorSize}
				profile={profile}
				extensions={extensions}
				getIsExtensionActive={getIsExtensionActive}
				onExtensionPress={onExtensionPress}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollContainer}
			>
				{children}
			</ScrollView>
		</View>
	);
};

export default DashboardLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	scrollContainer: {
		flex: 1,
	},
	contentContainer: {},
});
