import type {
	Config,
	Endpoint,
	EndpointMap,
	RemoteConfig,
	UserProfile,
} from '@walless/core';
import { defaultConfig, defaultRemoteConfig } from 'utils/constants';
import { proxy } from 'valtio';

const defaultEndpoint: Endpoint = __DEV__ ? 'devnet' : 'mainnet';

export const defaultEndpoints: EndpointMap = {
	solana: defaultEndpoint,
	sui: defaultEndpoint,
	tezos: defaultEndpoint,
	aptos: defaultEndpoint,
};

export interface AppState {
	version: string;
	invitationCode?: string;
	profile: UserProfile;
	config: Config;
	remoteConfig: RemoteConfig;
	endpoints: EndpointMap;
	jwtAuth?: string;
}

export const appState = proxy<AppState>({
	version: '1.0.0',
	profile: {},
	config: defaultConfig,
	remoteConfig: defaultRemoteConfig,
	endpoints: defaultEndpoints,
});
