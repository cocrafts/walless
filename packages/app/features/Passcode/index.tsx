import { BindDirections, modalActions } from '@walless/gui';

import {
	RequirePasscodeModal,
	type RequirePasscodeModalConfig,
} from './RequirePasscodeModal';

export const showRequirePasscodeModal = (
	config: RequirePasscodeModalConfig,
) => {
	modalActions.show({
		id: 'require-passcode',
		bindingDirection: BindDirections.InnerBottom,
		component: RequirePasscodeModal,
		context: {
			title: config.title,
			desc: config.desc,
			onPasscodeComplete: config.onPasscodeComplete,
			onActionComplete: config.onActionComplete,
		},
	});
};

export * from './PasscodeFeature';
