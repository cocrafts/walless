export const formatCountdownTime = (timeRemaining: number) => {
	const hours = Math.floor(
		(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
	return `${hours}h:${minutes}m:${seconds}s`;
};
