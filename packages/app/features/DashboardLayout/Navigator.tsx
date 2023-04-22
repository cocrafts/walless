import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { UserProfile } from '@walless/core';
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
	extensions,
	getIsExtensionActive,
	onExtensionPress,
}) => {
	const containerStyle = { width: size };

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
			</View>
			<View style={styles.commandContainer}></View>
		</View>
	);
};

export default DashboardNavigator;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
		backgroundColor: '#131C24',
	},
	orbContainer: {
		gap: 10,
	},
	commandContainer: {},
});
