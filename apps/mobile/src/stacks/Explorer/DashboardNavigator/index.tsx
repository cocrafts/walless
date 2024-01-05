import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { UserProfile } from '@walless/core';
import { runtime } from '@walless/core';
import { Compass } from '@walless/icons';
import { modules } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import { floatActions } from 'modals';
import { useUniversalInsets } from 'utils/hooks';

import NavigatorOrb from './NavigatorOrb';

interface Props {
	style?: StyleProp<ViewStyle>;
	size?: number;
	profile: UserProfile;
	widgets: WidgetDocument[];
	getIsExtensionActive?: (item: WidgetDocument) => boolean;
	onExtensionPress?: (item: WidgetDocument) => void;
	onRemoveLayout: (item: WidgetDocument) => void;
}

export const DashboardNavigator: FC<Props> = ({
	style,
	size = 58,
	profile,
	widgets,
	getIsExtensionActive,
	onExtensionPress,
	onRemoveLayout,
}) => {
	const insets = useUniversalInsets();
	const containerStyle = {
		width: size,
		paddingTop: Math.max(insets.top + 6, 12),
	};
	const exploreItem: Partial<WidgetDocument> = {
		_id: 'explorer',
		storeMeta: {
			iconColor: '#243f56',
			iconActiveColor: '#1394d3',
		} as never,
	};
	const profileItem: Partial<WidgetDocument> = {
		_id: 'profile',
		storeMeta: {
			iconUri: profile?.profileImage as string,
			iconSize: 40,
		} as never,
	};
	const isExplorerActive = getIsExtensionActive?.(exploreItem as never);

	const handleContextMenu = (
		item: WidgetDocument,
		ref: React.RefObject<View>,
	) => {
		floatActions.showRemoveLayoutModal({
			item,
			orbSize: 40,
			onRemoveLayout,
			bindingRef: ref,
		});
	};

	return (
		<View style={[styles.container, containerStyle, style]}>
			<View style={styles.orbContainer}>
				<NavigatorOrb
					item={exploreItem as never}
					iconSource={{ uri: '' }}
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

				{widgets.length > 0 && <View style={styles.orbDivider} />}

				{widgets.map((item) => {
					const isActive = getIsExtensionActive?.(item);
					const iconSource =
						modules.asset.widget[item._id]?.widgetMeta?.cardIcon;

					return (
						<NavigatorOrb
							key={item._id}
							item={item}
							isActive={isActive}
							iconSource={iconSource}
							onPress={onExtensionPress}
							onContextMenu={handleContextMenu}
						/>
					);
				})}
			</View>

			{runtime.isBrowser && profile?.profileImage && (
				<View style={styles.commandContainer}>
					<NavigatorOrb
						item={profileItem as never}
						iconSource={{ uri: profile.profileImage }}
						onPress={onExtensionPress}
						isActive={getIsExtensionActive?.(profileItem as never)}
					/>
				</View>
			)}
		</View>
	);
};

export default DashboardNavigator;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 12,
		backgroundColor: '#131C24',
		userSelect: 'none',
	},
	orbContainer: {
		flex: 1,
		gap: 10,
	},
	orbDivider: {
		height: 1,
		width: 48,
		alignSelf: 'center',
		backgroundColor: '#24303A',
	},
	commandContainer: {},
});
