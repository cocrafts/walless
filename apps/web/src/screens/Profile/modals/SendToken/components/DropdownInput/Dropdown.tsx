import { FC } from 'react';
import { modalActions, ModalConfigs } from '@walless/app';
import { ChevronDown } from '@walless/icons';
import { Input, Stack, Text } from '@walless/ui';

import { DropdownItemProps } from '../../internal';

import DropdownItem from './DropdownItem';
import { State } from './reducer';

interface DropdownProps {
	modalId: string;
	state: State;
	handleSelectItem: (item: DropdownItemProps) => void;
}

interface Props {
	config: ModalConfigs;
}

const Dropdown: FC<Props> = ({ config }) => {
	const { modalId, state, handleSelectItem } = config.context as DropdownProps;

	const hideModal = () => {
		modalActions.hide(modalId);
	};

	const handlePress = (item: DropdownItemProps) => {
		handleSelectItem(item);
		hideModal();
	};

	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			backgroundColor="#0E1419"
			borderRadius={15}
			paddingHorizontal={8}
			paddingVertical={8}
			marginTop={8}
		>
			{state.filteredItems.length ? (
				state.filteredItems.map((item) => (
					<DropdownItem
						key={item.id}
						id={item.id}
						name={item.name}
						icon={item.icon}
						onPress={() => handlePress(item)}
						isSelected={state.currentItem?.id === item.id}
					/>
				))
			) : (
				<Text width={320} paddingVertical={12} paddingHorizontal={16}>
					No results matched
				</Text>
			)}
		</Stack>
	);
};

export default Dropdown;
