import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type {
	Account,
	ReferralRankings,
	WalletInvitation,
} from '@walless/graphql';
import { queries } from '@walless/graphql';
import { Text, View } from '@walless/gui';
import { ArrowTopRight, Chart, Star } from '@walless/icons';
import { showLeaderBoard } from 'screens/Dashboard/Referral/LeaderBoard';
import { qlClient } from 'utils/graphql';
import type { SettingParamList } from 'utils/navigation';

import DetailsContainer from './DetailsContainer';
import InvitationCard from './InvitationCard';
import SuccessfulReferral from './SuccessfulReferral';

type Props = StackScreenProps<SettingParamList, 'Referral'>;

export const ReferralScreen: FC<Props> = () => {
	const [referralCodes, setReferralCodes] = useState<WalletInvitation[]>([]);
	const [referralRankings, setReferralRankings] = useState<ReferralRankings[]>(
		[],
	);

	const totalPoints = referralCodes.reduce(
		(acc, { email }) => acc + (email ? 20 : 0),
		0,
	);

	const goalPoints = 60;

	const rankingPercent = 10;

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
			onPress={() =>
				showLeaderBoard({ rankings: referralRankings, rankingPercent })
			}
		>
			<ArrowTopRight size={20} color="#FFFFFF" />
		</TouchableOpacity>
	);

	useEffect(() => {
		const fetchUserReferralCodes = async () => {
			const { userAccount } = await qlClient.request<{
				userAccount: Account;
			}>(queries.userReferralCodes);

			let codes = (userAccount.referralCodes as WalletInvitation[]) || [];
			codes = codes.sort((a, b) => (a.email ? 1 : 0) - (b.email ? 1 : 0));

			setReferralCodes(codes);
		};

		const fetchReferralRankings = async () => {
			const { referralRankings } = await qlClient.request<{
				referralRankings: ReferralRankings[];
			}>(queries.referralRankings);

			setReferralRankings(referralRankings || []);
		};

		fetchUserReferralCodes();
		fetchReferralRankings();
	}, []);

	return (
		<View style={[styles.container]}>
			<View style={styles.summaryContainer}>
				<SuccessfulReferral
					{...{
						currentPoints: totalPoints,
						goalPoints: goalPoints,
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
						Let&apos;s ride this wave together with your pals :)
					</Text>
				</View>

				<View style={styles.referralCodeList}>
					{referralCodes.map((invitation) => (
						<InvitationCard
							key={invitation.id}
							invitation={invitation.code as string}
							isReadyToCollect={!!invitation.email}
							points={20}
						/>
					))}
				</View>
			</View>
		</View>
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
