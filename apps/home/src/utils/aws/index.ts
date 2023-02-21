import { Analytics } from '@aws-amplify/analytics';

import config from './awsConfig';

const { region, pinpointAppId } = config;

export const configureAws = () => {
	Analytics.configure({
		autoSessionRecord: true,
		AWSPinpoint: {
			region,
			appId: pinpointAppId,
			mandatorySignIn: false,
		},
	});
};
