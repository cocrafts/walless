import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { UserProfile } from '@walless/core';
import { Compass } from '@walless/icons';
import { ExtensionDocument } from '@walless/store';

import NavigatorOrb from './NavigatorOrb';

interface Props {
	size?: number;
	profile: UserProfile;
	extensions: ExtensionDocument[];
	getIsExtensionActive?: (item: ExtensionDocument) => boolean;
	onExtensionPress?: (item: ExtensionDocument) => void;
}

export const DashboardNavigator: FC<Props> = ({
	size = 58,
	profile,
	extensions,
	getIsExtensionActive,
	onExtensionPress,
}) => {
	const containerStyle = { width: size };
	const exploreItem: Partial<ExtensionDocument> = {
		_id: '',
		storeMeta: {
			iconColor: '#0694d3',
		} as never,
	};
	const profileItem: Partial<ExtensionDocument> = {
		_id: 'profile',
		storeMeta: {
			iconUri: profile.profileImage as string,
			iconSize: 40,
		} as never,
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.orbContainer}>
				{extensions.map((item) => {
					const isActive = getIsExtensionActive?.(item);

					return (
						<NavigatorOrb
							key={item._id}
							item={item}
							isActive={isActive}
							onPress={onExtensionPress}
						/>
					);
				})}
				<NavigatorOrb
					item={exploreItem as never}
					onPress={onExtensionPress}
					isActive={getIsExtensionActive?.(exploreItem as never)}
				>
					<Compass size={22} />
				</NavigatorOrb>
			</View>
			<View style={styles.commandContainer}>
				<NavigatorOrb
					item={profileItem as never}
					onPress={onExtensionPress}
					isActive={getIsExtensionActive?.(profileItem as never)}
				/>
			</View>
		</View>
	);
};

export default DashboardNavigator;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		backgroundColor: '#131C24',
	},
	orbContainer: {
		flex: 1,
		gap: 10,
	},
	commandContainer: {},
});
