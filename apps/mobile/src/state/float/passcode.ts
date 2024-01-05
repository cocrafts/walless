import { BindDirections, modalActions } from '@walless/gui';
import type { RequirePasscodeModalConfig } from 'modals';
import { MODAL, RequirePasscodeModal } from 'modals';

export const showRequirePasscodeModal = (
	config: RequirePasscodeModalConfig,
) => {
	modalActions.show({
		id: MODAL.REQUIRE_PASSCODE,
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
