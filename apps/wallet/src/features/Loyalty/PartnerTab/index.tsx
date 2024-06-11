import { StyleSheet, Text, View } from 'react-native';
import type { ActionMetadata } from '@walless/graphql';
import { loyaltyState } from 'state/loyalty';
import { useSnapshot } from 'utils/hooks';

import { extractDataFromMetadata } from '../internal';

import PartnerFolder from './PartnerFolder';
import { showPartnerQuest } from './PartnerQuest';

const PartnerTab = () => {
	const { partnerActionMap } = useSnapshot(loyaltyState);

	return (
		<View style={styles.container}>
			{partnerActionMap.size === 0 && (
				<View style={styles.centerContainer}>
					<Text style={styles.noTaskText}>Coming soon!</Text>
				</View>
			)}

			<View style={styles.bottomContainer}>
				{Array.from(partnerActionMap.keys()).map((partner) => {
					const actions = partnerActionMap.get(partner);

					if (!actions) return;

					const metadata = extractDataFromMetadata(
						actions[0].metadata as ActionMetadata[],
					);

					const totalPoints = actions.reduce(
						(acc, cur) => acc + (cur.points || 0),
						0,
					);

					return (
						<PartnerFolder
							key={partner}
							partner={partner}
							desc={metadata.partnerDesc}
							icon={metadata.partnerIcon}
							thumbnail={metadata.partnerThumbnail}
							totalPoints={totalPoints}
							onPress={() =>
								showPartnerQuest({
									partner,
									actions,
									totalPoints,
								})
							}
						/>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noTaskText: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center',
	},
	bottomContainer: {
		gap: 8,
	},
});

export default PartnerTab;
