import type { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import type { UserProfile } from '@walless/core';
import { Compass } from '@walless/icons';
import type { WidgetDocument } from '@walless/store';

import NavigatorOrb from './NavigatorOrb';
import RemoveLayout from './RemoveLayout';

interface Props {
	size?: number;
	profile: UserProfile;
	widgets: WidgetDocument[];
	getIsExtensionActive?: (item: WidgetDocument) => boolean;
	onExtensionPress?: (item: WidgetDocument) => void;
	onRemoveLayout: (item: WidgetDocument) => void;
}

export const DashboardNavigator: FC<Props> = ({
	size = 58,
	profile,
	widgets,
	getIsExtensionActive,
	onExtensionPress,
	onRemoveLayout,
}) => {
	const containerStyle = { width: size };
	const exploreItem: Partial<WidgetDocument> = {
		_id: '',
		storeMeta: {
			iconColor: '#243f56',
			iconActiveColor: '#1394d3',
		} as never,
	};
	const profileItem: Partial<WidgetDocument> = {
		_id: 'profile',
		storeMeta: {
			iconUri: profile.profileImage as string,
			iconSize: 40,
		} as never,
	};
	const isExplorerActive = getIsExtensionActive?.(exploreItem as never);

	return (
		<SafeAreaView style={[styles.container, containerStyle]}>
			<View style={styles.orbContainer}>
				{widgets.map((item) => {
					const isActive = getIsExtensionActive?.(item);

					return (
						<NavigatorOrb
							key={item._id}
							item={item}
							isActive={isActive}
							onPress={onExtensionPress}
							ContextComponent={RemoveLayout}
							onRemoveLayout={onRemoveLayout}
						/>
					);
				})}
				<NavigatorOrb
					item={exploreItem as never}
					isActive={isExplorerActive}
					onPress={onExtensionPress}
				>
					<Compass
						size={22}
						colors={
							isExplorerActive ? ['#FFFFFF', '#0694D3'] : ['#0694D3', '#243f56']
						}
					/>
				</NavigatorOrb>
			</View>
			<View style={styles.commandContainer}>
				<NavigatorOrb
					item={profileItem as never}
					onPress={onExtensionPress}
					isActive={getIsExtensionActive?.(profileItem as never)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DashboardNavigator;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		backgroundColor: '#131C24',
		height: '100%',
	},
	orbContainer: {
		flex: 1,
		gap: 10,
	},
	commandContainer: {},
});
