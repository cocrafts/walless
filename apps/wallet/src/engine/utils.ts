import type { NetworkCluster } from '@walless/core';
import type { NetworkClustersDocument } from '@walless/store';
import { environment } from 'utils/config';
import { storage } from 'utils/storage';

export const getNetworkClusters = async () => {
	let networkClusters =
		await storage.safeGet<NetworkClustersDocument>('clusters');

	if (!networkClusters) {
		networkClusters = {
			_id: 'clusters',
			type: 'ClusterMap',
			...defaultNetworkClusters,
		};
		await storage.put(networkClusters);
	}

	return networkClusters;
};

const defaultNetworkCluster: NetworkCluster =
	environment.NETWORK_CLUSTER || 'devnet';

export const defaultNetworkClusters = {
	solana: defaultNetworkCluster,
	sui: defaultNetworkCluster,
	tezos: defaultNetworkCluster,
	aptos: defaultNetworkCluster,
};
