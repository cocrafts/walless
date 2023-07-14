import type { FC } from 'react';
import { useEffect, useReducer, useRef } from 'react';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import { ChevronDown } from '@walless/icons';
import { Button, Stack, Text } from '@walless/ui';

import type { DropdownItemProps, DropdownProps } from '../../internal';

import IconText from './IconText';
import InputDropdownModal from './InputDropdownModal';
import type { State } from './reducer';
import { ActionType, reducer } from './reducer';

const InputDropdown: FC<DropdownProps> = ({ name, items, setChosen }) => {
	const dropdownRef = useRef(null);

	const [state, dispatch] = useReducer(reducer, {
		items,
		filteredItems: items,
		currentItem: items.length === 1 ? items[0] : null,
		query: '',
		isDropdownOpen: false,
	} as State);

	const handleSelectItem = (item: DropdownItemProps) => {
		dispatch({ type: ActionType.SELECT_ITEM, payload: item });
		if (setChosen) {
			setChosen(item);
		}
	};

	const handleFilter = (query: string) => {
		dispatch({
			type: ActionType.QUERY,
			payload: query,
		});
	};

	const modalId = `dropdown-${name}`;
	const showDropdown = () => {
		modalActions.show({
			id: modalId,
			component: InputDropdownModal,
			bindingRef: dropdownRef,
			bindingDirection: BindDirections.InnerTop,
			animateDirection: AnimateDirections.Inner,
			positionOffset: { x: 0, y: -8 },
			maskActiveOpacity: 0,
			context: {
				modalId,
				state,
				handleSelectItem,
				handleFilter,
			},
		});
	};

	useEffect(() => {
		state.isDropdownOpen ? showDropdown() : modalActions.hide(modalId);
	}, [state.isDropdownOpen, state.query]);

	return (
		<Stack alignItems="center" ref={dropdownRef}>
			<Button
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
				onPress={showDropdown}
			>
				{state.currentItem ? (
					<Stack
						flexGrow={1}
						alignItems="flex-start"
						padding={0}
						backgroundColor="transparent"
					>
						<IconText
							icon={state.currentItem.icon}
							name={state.currentItem.name}
						/>
					</Stack>
				) : (
					<Text color="#566674" cursor="text" flexGrow={1}>
						{name}
					</Text>
				)}
				<ChevronDown color="#566674" size={16} />
			</Button>
		</Stack>
	);
};

export default InputDropdown;
