import { StyleSheet, Text, View } from 'react-native';
import type { ActionMetadata } from '@walless/graphql';
import { loyaltyState } from 'state/loyalty';
import { useSnapshot } from 'utils/hooks';

import { extractDataFromMetadata } from '../ActionCard/internal';

import PartnerFolder from './PartnerFolder';

const PartnerTab = () => {
	const { partnerActionMap } = useSnapshot(loyaltyState);

	return (
		<View style={styles.container}>
			{partnerActionMap.size === 0 && (
				<View style={styles.centerContainer}>
					<Text style={styles.noTaskText}>
						There is no available tasks, please comeback later!
					</Text>
				</View>
			)}

			<View style={styles.bottomContainer}>
				{Array.from(partnerActionMap.keys()).map((partner) => {
					const actions = partnerActionMap.get(partner);

					if (!actions) return;

					const metadata = extractDataFromMetadata(
						actions[0].metadata as ActionMetadata[],
					);

					return (
						<PartnerFolder
							key={partner}
							partner={partner}
							desc={metadata.partnerDesc}
							icon={metadata.partnerIcon}
							thumbnail={metadata.partnerThumbnail}
							totalPoints={actions.reduce(
								(acc, cur) => acc + (cur.points || 0),
								0,
							)}
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
		color: 'white',
		textAlign: 'center',
	},
	bottomContainer: {
		gap: 8,
	},
});

export default PartnerTab;
