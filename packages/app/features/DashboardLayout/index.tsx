import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import type { UserProfile } from '@walless/core';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

import Navigator from './Navigator';

interface Props {
	style?: ViewStyle;
	children?: ReactNode;
	navigatorSize?: number;
	profile: UserProfile;
	widgets: WidgetDocument[];
	getIsExtensionActive?: (item: WidgetDocument) => boolean;
	onExtensionPress?: (item: WidgetDocument) => void;
	onRemoveLayout: (item: WidgetDocument) => void;
}

export const DashboardLayout: FC<Props> = ({
	style,
	children,
	navigatorSize,
	profile,
	widgets,
	getIsExtensionActive,
	onExtensionPress,
	onRemoveLayout,
}) => {
	return (
		<View style={[styles.container, style]}>
			<Navigator
				size={navigatorSize}
				profile={profile}
				widgets={widgets}
				getIsExtensionActive={getIsExtensionActive}
				onExtensionPress={onExtensionPress}
				onRemoveLayout={onRemoveLayout}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollContainer}
				contentContainerStyle={styles.contentContainer}
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
	contentContainer: {
		flexGrow: 1,
	},
});
