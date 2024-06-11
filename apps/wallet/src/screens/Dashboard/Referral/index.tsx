import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { Account, WalletInvitation } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowTopRight, Chart, Star } from '@walless/icons';
import { qlClient } from 'utils/graphql';
import { useSafeAreaInsets } from 'utils/hooks';
import type { SettingParamList } from 'utils/navigation';

import DetailsContainer from './DetailsContainer';
import { calculateRankingPercent } from './internal';
import InvitationCard from './InvitationCard';
import { showLeaderboard } from './LeaderBoard';
import ReferralStats from './ReferralStats';

type Props = StackScreenProps<SettingParamList, 'Referral'>;

const goalPoints = 100;
const pointsPerReferral = 20;

export const ReferralScreen: FC<Props> = () => {
	const [codes, setCodes] = useState<WalletInvitation[]>([]);
	const [rank, setRank] = useState<number>(0);
	const [leaderboardSize, setLeaderboardSize] = useState<number>(0);
	const safeAreaInsets = useSafeAreaInsets();

	const safeAreaStyle: ViewStyle = {
		marginBottom: safeAreaInsets.bottom,
	};

	const totalPoints = codes.reduce(
		(acc, { email }) => acc + (email ? pointsPerReferral : 0),
		0,
	);

	const referralCount = useMemo(
		() => codes.filter(({ email }) => !!email).length,
		[codes],
	);

	const rankingPercent = useMemo(
		() =>
			leaderboardSize !== 0
				? calculateRankingPercent(rank, leaderboardSize)
				: 0,
		[rank, leaderboardSize],
	);

	const ChartIcon = (
		<View style={[styles.chartIcon, styles.icon]}>
			<Chart size={20} color="#F6D570" />
		</View>
	);

	const StarIcon = (
		<View style={[styles.starIcon, styles.icon]}>
			<Star size={20} color="#44C5FF" />
		</View>
	);

	const ArrowIcon = (
		<Hoverable
			style={styles.arrowIcon}
			onPress={() =>
				showLeaderboard({
					rank,
					referralCount,
					rankingPercent,
					leaderboardSize,
					safeAreaInsets,
				})
			}
		>
			<ArrowTopRight size={20} color="#FFFFFF" />
		</Hoverable>
	);

	useEffect(() => {
		const fetchUserReferralCodes = async () => {
			const { userAccount } = await qlClient.request<{
				userAccount: Account;
			}>(queries.userReferralCodes);

			let refCodes = userAccount
				? (userAccount.referralCodes as WalletInvitation[])
				: [];
			refCodes = refCodes.sort((a, b) => (a.email ? 1 : 0) - (b.email ? 1 : 0));

			setCodes(refCodes);
			setRank(userAccount?.referralRank || 0);
		};

		const fetchReferralLeaderboardSize = async () => {
			const { referralLeaderboardSize } = await qlClient.request<{
				referralLeaderboardSize: number;
			}>(queries.referralLeaderboardSize);

			setLeaderboardSize(referralLeaderboardSize);
		};

		fetchUserReferralCodes().catch(console.error);
		fetchReferralLeaderboardSize().catch(console.error);
	}, []);

	return (
		<View style={[styles.container, safeAreaStyle]}>
			<View style={styles.summaryContainer}>
				<ReferralStats currentPoints={totalPoints} goalPoints={goalPoints} />

				<View style={styles.infoDetailsContainer}>
					<DetailsContainer
						LeftIcon={ChartIcon}
						title="You are in"
						value={rank ? `Top ${rankingPercent}%` : 'N/A'}
						RightIcon={ArrowIcon}
					/>
					<DetailsContainer
						LeftIcon={StarIcon}
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
					{codes.map((invitation) => (
						<InvitationCard
							key={invitation.code}
							code={invitation.code as string}
							isClaimed={!!invitation.email}
							points={20}
						/>
					))}
					<Text style={styles.subtext}>
						More Invitation codes are awaiting, stay tuned!
					</Text>
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
		paddingTop: 16,
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
		flex: 1,
		backgroundColor: '#131C24',
		borderTopStartRadius: 16,
		borderTopEndRadius: 16,
		padding: 16,
		gap: 12,
	},
	referralCodeList: {
		flex: 1,
		gap: 12,
	},
	titleContainer: {
		gap: 12,
	},
});
