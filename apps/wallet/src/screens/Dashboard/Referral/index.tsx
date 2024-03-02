import type { FC } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from '@walless/gui';
import { ArrowTopRight, Chart, Star } from '@walless/icons';
import { showLeaderBoard } from 'screens/Dashboard/Referral/LeaderBoard';
import type { SettingParamList } from 'utils/navigation';

import DetailsContainer from './DetailsContainer';
import { mockNewInvitation } from './internal';
import InvitationCard from './InvitationCard';
import SuccessfulReferral from './SuccessfulReferral';

type Props = StackScreenProps<SettingParamList, 'Referral'>;

export const ReferralScreen: FC<Props> = () => {
	const totalPoints = 200;
	const rankingPercent = 10;
	const currentPoints = 20;

	const chartIcon = (
		<View style={[styles.chartIcon, styles.icon]}>
			<Chart size={20} color="#F6D570" />
		</View>
	);

	const starIcon = (
		<View style={[styles.starIcon, styles.icon]}>
			<Star size={20} color="#44C5FF" />
		</View>
	);

	const arrowIcon = (
		<TouchableOpacity
			style={styles.arrowIcon}
			onPress={() => showLeaderBoard({ rankingPercent })}
		>
			<ArrowTopRight size={20} color="#FFFFFF" />
		</TouchableOpacity>
	);

	return (
		<ScrollView showsVerticalScrollIndicator={false} style={[styles.container]}>
			<View style={styles.summaryContainer}>
				<SuccessfulReferral
					{...{
						currentPoints: currentPoints,
						goalPoint: 60,
					}}
				/>
				<View style={styles.infoDetailsContainer}>
					<DetailsContainer
						LeftIcon={chartIcon}
						title="You are in"
						value={`Top ${rankingPercent}%`}
						RightIcon={arrowIcon}
					/>
					<DetailsContainer
						LeftIcon={starIcon}
						title="Your Point"
						value={totalPoints.toString()}
					/>
				</View>
			</View>

			<View style={styles.referralCodeContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Spread the fun!</Text>
					<Text style={styles.subtext}>
						Let&apos;s ride this wave together with your pals{' '}
					</Text>
				</View>
				<View style={styles.referralCodeList}>
					{mockNewInvitation.map((invitation) => (
						<InvitationCard
							key={invitation}
							invitation={invitation}
							isReadyToCollect={true}
							points={20}
						/>
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default ReferralScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#ffffff',
		textAlign: 'center',
	},
	subtext: {
		color: '#566674',
		textAlign: 'center',
	},
	summaryContainer: {
		backgroundColor: '#131C24',
		borderRadius: 16,
		padding: 16,
		gap: 12,
		marginHorizontal: 12,
		marginBottom: 12,
	},
	infoDetailsContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	chartIcon: {
		borderColor: '#F6D57033',
	},
	starIcon: {
		borderColor: '#44C5FF33',
	},
	arrowIcon: {
		backgroundColor: '#1F2A34',
		padding: 8,
		borderRadius: 50,
	},
	icon: {
		padding: 8,
		borderRadius: 50,
		borderWidth: 1,
	},
	referralCodeContainer: {
		backgroundColor: '#131C24',
		borderRadius: 16,
		padding: 16,
	},
	referralCodeList: {
		flex: 1,
		gap: 12,
	},
	titleContainer: {
		gap: 12,
		marginBottom: 12,
	},
});
