import { FC, useEffect, useReducer, useRef } from 'react';
import { AnimateDirections, BindDirections, modalActions } from '@walless/app';
import { ChevronDown } from '@walless/icons';
import { Button, Input, Stack } from '@walless/ui';

import { DropdownItemProps, DropdownProps } from '../../internal';

import Dropdown from './Dropdown';
import IconText from './IconText';
import { ActionType, reducer, State } from './reducer';

const DropdownInput: FC<DropdownProps> = ({ name, items, setChosen }) => {
	const dropdownRef = useRef(null);

	const [state, dispatch] = useReducer(reducer, {
		items,
		filteredItems: items,
		currentItem: null,
		query: '',
		isDropdownOpen: false,
	} as State);

	const handleSelectItem = (item: DropdownItemProps) => {
		dispatch({ type: ActionType.SELECT_ITEM, payload: item });
		if (setChosen) {
			setChosen(item);
		}
	};

	const handlePressChangeInput = () => {
		dispatch({
			type: ActionType.QUERY,
			payload: state.currentItem?.name,
		});
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
			component: Dropdown,
			bindingRef: dropdownRef,
			bindingDirection: BindDirections.Bottom,
			animateDirection: AnimateDirections.Inner,
			positionOffset: { x: 0, y: -8 },
			context: {
				modalId,
				state,
				handleSelectItem,
			},
		});
	};

	useEffect(() => {
		state.isDropdownOpen ? showDropdown() : modalActions.hide(modalId);
	}, [state.isDropdownOpen, state.query]);

	return (
		<Stack alignItems="center" ref={dropdownRef}>
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
				{state.currentItem && !state.isDropdownOpen ? (
					<Button
						flexGrow={1}
						alignItems="flex-start"
						padding={0}
						backgroundColor="transparent"
						onPress={handlePressChangeInput}
					>
						<IconText
							icon={state.currentItem.icon}
							name={state.currentItem.name}
						/>
					</Button>
				) : (
					<Input
						flexGrow={1}
						autoComplete="off"
						justifyContent="center"
						alignItems="center"
						backgroundColor="transparent"
						borderColor="transparent"
						paddingHorizontal={0}
						focusStyle={{ borderColor: 'transparent' }}
						defaultValue={state.query}
						placeholder={name}
						placeholderTextColor="#566674"
						onFocus={showDropdown}
						onChangeText={(query) => handleFilter(query)}
					/>
				)}
				<ChevronDown color="#566674" size={16} />
			</Stack>
		</Stack>
	);
};

export default DropdownInput;
