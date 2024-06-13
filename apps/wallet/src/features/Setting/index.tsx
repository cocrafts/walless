import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import {
	ArrowTopRight,
	Book,
	LogOut,
	Message,
	Shield,
	Star,
	Twitter,
	Window,
} from '@walless/icons';
import { showLogoutModal } from 'modals/LogoutModal';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';
import { navigate } from 'utils/navigation';

import MyWallets from './MyWallets';
import SettingButton from './SettingButton';

interface Props {
	style?: ViewStyle;
}

const SettingFeature: FC<Props> = ({ style }) => {
	const { profile, config } = useSnapshot(appState);
	const displayName = profile.name || profile.email || 'Anonymous';
	const imageSource = { uri: profile.profileImage };

	const handleNavigateToReferralScreen = () => {
		navigate('Dashboard', {
			screen: 'Setting',
			params: { screen: 'Referral' },
		});
	};

	return (
		<View style={style}>
			<View style={styles.infoContainer}>
				<Image source={imageSource} style={styles.avatar} />
				<Text style={styles.nameText}>{displayName}</Text>
			</View>

			<View style={styles.delimiter} />

			<View style={styles.innerContainer}>
				<MyWallets />

				<View>
					<Text style={styles.title}>Settings</Text>

					<View style={styles.sectionContainer}>
						<SettingButton
							title="Referral"
							prefixIcon={<Star size={16} />}
							hasNotification
							isNew
							onPress={handleNavigateToReferralScreen}
						/>

						<SettingButton
							title="Feedback to us"
							prefixIcon={<Message />}
							suffixIcon={<ArrowTopRight size={16} />}
							onPress={() => Linking.openURL('https://discord.gg/uG2JEmTZXZ')}
						/>

						<SettingButton
							title="Contact Support"
							prefixIcon={<Book />}
							suffixIcon={<ArrowTopRight size={16} />}
							onPress={() => Linking.openURL('https://discord.gg/3v7jwG45pe')}
						/>

						<SettingButton
							title="Privacy Policy"
							prefixIcon={<Shield size={16} />}
							suffixIcon={<ArrowTopRight size={16} />}
							onPress={() =>
								Linking.openURL('https://walless.io/privacy-policy')
							}
						/>

						<SettingButton
							title="About Walless"
							prefixIcon={<Window />}
							suffixIcon={<ArrowTopRight size={16} />}
							onPress={() => Linking.openURL('https://walless.io/')}
						/>

						<SettingButton
							title="Log out"
							titleColor="#A45151"
							prefixIcon={<LogOut color="#A45151" size={16} />}
							prefixIconContainerStyle={{ backgroundColor: '#422626' }}
							onPress={showLogoutModal}
						/>
					</View>
				</View>

				<View>
					<Text style={styles.title}>Follow Us</Text>

					<SettingButton
						title="Follow us on Twitter"
						prefixIcon={<Twitter color="#0694D3" />}
						prefixIconContainerStyle={{ backgroundColor: '#243F56' }}
						onPress={() =>
							Linking.openURL('https://twitter.com/walless_wallet')
						}
					/>
				</View>

				<View>
					<Text style={styles.poweredText}>
						Powered by walless.io, version@{config.version}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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
	sectionContainer: {
		gap: 12,
	},
	innerContainer: {
		gap: 16,
	},
	poweredText: {
		fontSize: 12,
		color: '#5D6A73',
		textAlign: 'center',
		marginTop: 24,
	},
});

export default SettingFeature;
