import { FC, useEffect, useRef, useState } from 'react';
import { BindDirections, modalActions } from '@walless/app';
import { Image, Input, Stack, Text } from '@walless/gui';
import { ChevronDown } from '@walless/icons';
import { DropdownItemProps } from 'screens/Test/internal';

import ClearBtn from './ClearBtn';
import Dropdown from './Dropdown';

interface Props {
	sourceList: DropdownItemProps[];
	numberOfAppearItems?: number;
	placeholder?: string;
}

const InputDropdown: FC<Props> = ({ placeholder, sourceList }) => {
	const dropdownRef = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [filteredList, setFilteredList] =
		useState<DropdownItemProps[]>(sourceList);
	const [selectedItem, setSelectedItem] = useState<DropdownItemProps | null>(
		null,
	);
	const [isDroppedDown, setIsDroppedDown] = useState(false);
	const [query, setQuery] = useState<string>('');

	useEffect(() => {
		if (query) {
			const filtered = sourceList.filter((item) =>
				item.name.toLowerCase().includes(query.toLowerCase()),
			);
			setFilteredList(filtered);
		} else {
			setFilteredList(sourceList);
		}

		modalActions.show({
			id: 'dropdown',
			component: Dropdown,
			context: {
				items: filteredList,
				setChosen: handleChooseItem,
				selectedItem: selectedItem,
			},
			bindingDirection: BindDirections.Bottom,
			maskActiveOpacity: 0,
			bindingRef: dropdownRef,
		});
	}, [query, sourceList]);

	const handleClick = () => {
		setIsDroppedDown(true);
		modalActions.show({
			id: 'dropdown',
			component: Dropdown,
			context: {
				items: filteredList,
				setChosen: handleChooseItem,
				selectedItem: selectedItem,
			},
			bindingDirection: BindDirections.Bottom,
			maskActiveOpacity: 0,
			bindingRef: dropdownRef,
		});
	};

	const handleSelectActiveItem = () => {
		setIsDroppedDown(true);
		setSelectedItem(null);
	};

	const handleClear = () => {
		setSelectedItem(null);
		setQuery('');
		setIsDroppedDown(true);
	};

	const handleChooseItem = (item: DropdownItemProps) => {
		setSelectedItem(item);
		setQuery(item.name);
		setIsDroppedDown(false);
		modalActions.hide('dropdown');
	};

	return (
		<Stack alignItems="center">
			<Stack  
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				width={336}
				height={48}
				borderRadius={16}
				borderWidth={isDroppedDown ? 1 : 0}
				borderColor="#49596A"
				backgroundColor="#0E141A"
				padding={8}
				ref={dropdownRef}
				zIndex={1}
			>
				{selectedItem ? (
					<Stack
						paddingHorizontal={8}
						onPress={handleSelectActiveItem}
						flexGrow={1}
						flexDirection="row"
						justifyContent="flex-start"
						alignItems="center"
						gap={4}
					>
						{selectedItem.icon && (
							<Image
								src={selectedItem.icon}
								width={16}
								height={16}
								borderRadius={8}
							/>
						)}
						<Text fontWeight="400" fontSize={14} color="#FFFFFF">
							{selectedItem.name}
						</Text>
					</Stack>
				) : (
					<Input
						ref={inputRef}
						flexGrow={1}
						justifyContent="center"
						alignItems="center"
						backgroundColor="transparent"
						borderColor="transparent"
						focusStyle={{ borderColor: 'transparent' }}
						placeholder={placeholder}
						onFocus={handleClick}
						onBlur={() => setIsDroppedDown(false)}
						onChangeText={setQuery}
						value={query}
					/>
				)}

				<ClearBtn onPress={handleClear} />

				<Stack cursor="pointer">
					<ChevronDown size={16} color="#566674" />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default InputDropdown;
