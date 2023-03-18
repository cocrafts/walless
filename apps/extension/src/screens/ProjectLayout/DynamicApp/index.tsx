import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CollectibleRecord } from '@walless/storage';

import RunnerNft from './RunnerNft';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgb(47, 47, 47)',
	},
	collectionContainer: {
		flexDirection: 'row',
		paddingHorizontal: 8,
		marginTop: 8,
		marginBottom: 64,
	},
});

export const DynamicAppLayout: FC = () => {
	const [nft, setNft] = useState('origin');
	const resourceUri = `/runner/${nft}.png`;

	useEffect(() => {
		let runner: any;

		setTimeout(() => {
			runner = new global.Runner('.interstitial-wrapper');
		}, 200);

		return () => {
			console.log(runner);
		};
	}, []);

	const onNftPress = (item: CollectibleRecord) => {
		setNft(item.metadata?.imageUri as string);
		console.log(item);
	};

	return (
		<View style={styles.container}>
			<View style={styles.collectionContainer}>
				{mockNfts.map((item) => {
					return <RunnerNft key={item.id} item={item} onPress={onNftPress} />;
				})}
			</View>
			<img
				id="offline-resources-1x"
				className="hidden"
				src="/runner/origin-one.png"
			/>
			<img id="offline-resources-2x" className="hidden" src={resourceUri} />
			<div
				style={{ marginTop: 50, minHeight: 150 }}
				id="main-frame-error"
				className="interstitial-wrapper"
			>
				<div id="main-content">
					<div className="icon icon-offline" alt=""></div>
				</div>
			</div>
		</View>
	);
};

export default DynamicAppLayout;

const mockNfts: CollectibleRecord[] = [
	{
		id: '0001',
		metadata: {
			name: 'Vian Royal',
			description:
				'Vian was a young sorcerer, born with a gift for magic. His powerful abilities drew the attention of dark forces.',
			collectionName: 'TRex Runner',
			imageUri: 'vianroyal',
		},
	},
	{
		id: '0002',
		metadata: {
			name: 'Kuga',
			description:
				'Kuga was a skilled assassin, feared by many in the underworld.',
			collectionName: 'TRex Runner',
			imageUri: 'kuga',
		},
	},
	{
		id: '0003',
		metadata: {
			name: 'Dino',
			description:
				'Dino, the last surviving dinosaur, roamed the desolate wasteland.',
			collectionName: 'TRex Runner',
			imageUri: 'origin',
		},
	},
];
