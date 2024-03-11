export const calculateRankingPercent = (
	rank: number,
	leaderboardSize: number,
) => {
	const thresholds = [1, 5, 10, 50, 100];
	const rankPercent = (rank / leaderboardSize) * 100;
	return thresholds.find((threshold) => rankPercent <= threshold) || 100;
};
