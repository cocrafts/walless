declare module 'react-native-syntax-highlighter';
declare module 'react-syntax-highlighter/styles/hljs';

declare const FIREBASE_API_KEY: string;
declare const BUILD_TARGET: string;
declare const BROWSER_CLIENT_ID: string;
declare const EXTENSION_CLIENT_ID: string;
declare const FIREBASE_AUTH_DOMAIN: string;
declare const FIREBASE_PROJECT_ID: string;
declare const FIREBASE_STORAGE_BUCKET: string;
declare const FIREBASE_MESSAGING_SENDER_ID: string;
declare const FIREBASE_APP_ID: string;
declare const FIREBASE_MEASUREMENT_ID: string;
declare const WEB3AUTH_ID: string;
declare const GATEFI_ENDPOINT: string;
declare const GATEFI_MERCHANT_ID: string;
declare const GRAPHQL_ENDPOINT: string;
declare const PIXEVERSE_ENDPOINT: string;
declare const PIXEVERSE_ORIGIN: string;
declare const PIXEVERSE_URL: string;
declare const SOLANA_CLUSTER_URL: string;

declare module 'react-native-config' {
	export interface NativeConfig {
		FIREBASE_API_KEY: string;
		BUILD_TARGET: string;
		GOOGLE_SIGNIN_CLIENT_ID: string;
		BROWSER_CLIENT_ID: string;
		EXTENSION_CLIENT_ID: string;
		FIREBASE_AUTH_DOMAIN: string;
		FIREBASE_PROJECT_ID: string;
		FIREBASE_STORAGE_BUCKET: string;
		FIREBASE_MESSAGING_SENDER_ID: string;
		FIREBASE_APP_ID: string;
		FIREBASE_MEASUREMENT_ID: string;
		WEB3AUTH_ID: string;
		GRAPHQL_ENDPOINT: string;
		PIXEVERSE_ENDPOINT: string;
		PIXEVERSE_ORIGIN: string;
		PIXEVERSE_URL: string;
		SOLANA_CLUSTER_URL: string;
	}

	export const Config: NativeConfig;
	export default Config;
}
