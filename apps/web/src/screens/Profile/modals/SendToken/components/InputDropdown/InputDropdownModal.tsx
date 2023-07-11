import type { FC } from 'react';
import type { ModalConfigs } from '@walless/gui';
import { modalActions } from '@walless/gui';
import { ChevronDown } from '@walless/icons';
import { Input, ScrollView, Stack, Text } from '@walless/ui';

import type { DropdownItemProps } from '../../internal';

import DropdownItem from './DropdownItem';
import type { State } from './reducer';

interface DropdownProps {
	modalId: string;
	state: State;
	handleSelectItem: (item: DropdownItemProps) => void;
	handleFilter: (query: string) => void;
}

interface Props {
	config: ModalConfigs;
}

const InputDropdownModal: FC<Props> = ({ config }) => {
	const { modalId, state, handleSelectItem, handleFilter } =
		config.context as DropdownProps;

	const hideModal = () => {
		modalActions.hide(modalId);
	};

	const handlePress = (item: DropdownItemProps) => {
		handleSelectItem(item);
		hideModal();
	};

	return (
		<Stack alignItems="center">
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				gap={8}
				backgroundColor="#0E141A"
				width={336}
				height={48}
				borderRadius={15}
				borderColor="transparent"
				paddingHorizontal={16}
			>
				<Input
					flexGrow={1}
					autoComplete="off"
					justifyContent="center"
					alignItems="center"
					backgroundColor="transparent"
					borderColor="transparent"
					paddingHorizontal={0}
					focusStyle={{ borderColor: 'transparent' }}
					value={state.query}
					placeholderTextColor="#566674"
					onChangeText={(query) => handleFilter(query)}
					autoFocus
				/>

				<ChevronDown color="#566674" size={16} />
			</Stack>

			<ScrollView
				alignItems="center"
				justifyContent="center"
				backgroundColor="#0E1419"
				borderRadius={15}
				paddingHorizontal={8}
				paddingVertical={8}
				marginTop={8}
				maxHeight={200} // 200 = 5 items (5 * 40)
				showsVerticalScrollIndicator={false}
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
			</ScrollView>
		</Stack>
	);
};

export default InputDropdownModal;
