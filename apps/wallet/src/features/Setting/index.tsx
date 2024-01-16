import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { appState } from '@walless/engine';
import { Twitter } from '@walless/icons';
import { useSnapshot } from 'utils/hooks';

import ForwardLink from './ForwardLink';
import HelpCenter from './HelpCenter';
import Logout from './Logout';
import MyWallets from './MyWallets';
import ReferralCard from './ReferralCard';

interface Props {
	style?: ViewStyle;
}

const SettingFeature: FC<Props> = ({ style }) => {
	const { profile } = useSnapshot(appState);
	const displayName = profile.name || profile.email || 'Anonymous';
	const imageSource = { uri: profile.profileImage };

	return (
		<View style={[styles.container, style]}>
			<View style={styles.infoContainer}>
				<Image source={imageSource} style={styles.avatar} />
				<Text style={styles.nameText}>{displayName}</Text>
			</View>

			<ReferralCard />

			<View style={styles.delimiter} />

			<View style={styles.innerContainer}>
				<MyWallets />

				<View>
					<Text style={styles.title}>Help Center</Text>
					<View style={styles.forwardLinkContainer}>
						<HelpCenter />
						<Logout />
					</View>
				</View>

				<View>
					<Text style={styles.title}>Follow Us</Text>
					<ForwardLink
						link="https://twitter.com/walless_wallet"
						title="Follow us on Twitter"
						icon={<Twitter color="#0694D3" />}
						iconBackground="#243F56"
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingTop: 16,
		paddingBottom: 36,
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	nameText: {
		fontSize: 20,
		color: 'white',
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	delimiter: {
		height: 1,
		backgroundColor: '#56667466',
		marginTop: 10,
		marginBottom: 14,
	},
	title: {
		color: '#566674',
		marginBottom: 4,
	},
	forwardLinkContainer: {
		gap: 12,
	},
	innerContainer: {
		gap: 16,
	},
});

export default SettingFeature;
