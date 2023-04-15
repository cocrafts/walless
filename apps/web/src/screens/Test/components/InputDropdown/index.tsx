import { FC, useRef, useState } from 'react';
import { BindDirections, modalActions } from '@walless/app';
import { Image, Input, Stack, Text } from '@walless/gui';
import { ChevronDown, Times } from '@walless/icons';
import { DropdownItemProps } from 'screens/Test/internal';

import Dropdown from './Dropdown';

interface Props {
	sourceList: DropdownItemProps[];
	numberOfAppearItems?: number;
	placeholder?: string;
}

const InputDropdown: FC<Props> = ({ placeholder, sourceList }) => {
	const [isActive, setIsActive] = useState(false);
	const [selectedItem, setSelectedItem] = useState<DropdownItemProps | null>(
		null,
	);
	const [inputIsFocused, setInputIsFocused] = useState(false);
	const [filteredList, setFilteredList] =
		useState<DropdownItemProps[]>(sourceList);
	const [query, setQuery] = useState('');
	const dropdownRef = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChangeText = (text: string) => {
		setQuery(text);
	};

	const handleSelectItem = (item: DropdownItemProps) => {
		setSelectedItem(item);
		setIsActive(false);
		setQuery(item.name);
		setInputIsFocused(false);
		modalActions.destroy('dropdown');
	};

	const handleClick = () => {
		modalActions.show({
			id: 'dropdown',
			component: Dropdown,
			context: {
				items: filteredList,
				setChosen: handleSelectItem,
				selectedItem: selectedItem,
			},
			bindingDirection: BindDirections.Bottom,
			maskActiveOpacity: 0,
			bindingRef: dropdownRef,
		});
	};

	const handleSelectActiveItem = () => {
		setInputIsFocused(true);
		setIsActive(true);
	};

	const handleClear = () => {
		setQuery('');
		setSelectedItem(null);
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
				borderWidth={isActive ? 1 : 0}
				borderColor="#49596A"
				backgroundColor="#0E141A"
				padding={8}
				ref={dropdownRef}
			>
				{selectedItem && !inputIsFocused ? (
					<Stack
						paddingHorizontal={8}
						onPress={handleSelectActiveItem}
						flexGrow={1}
						alignItems="flex-start"
					>
						<Stack
							flexDirection="row"
							justifyContent="center"
							alignItems="center"
							gap={4}
						>
							{selectedItem.icon && (
								<Image
									src={selectedItem.icon as string}
									width={16}
									height={16}
									borderRadius={8}
								/>
							)}
							<Text fontWeight="400" fontSize={14} color="#FFFFFF">
								{selectedItem.name}
							</Text>
						</Stack>
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
						onPress={handleClick}
						zIndex={1}
						onFocus={() => setIsActive(true)}
						onBlur={() => setIsActive(false)}
						onChangeText={handleChangeText}
						value={query}
					/>
				)}

				<Stack
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					{isActive && (
						<Stack
							justifyContent="center"
							alignItems="center"
							backgroundColor="#1E2830"
							width={16}
							height={16}
							borderRadius={16}
							cursor="pointer"
							onPress={handleClear}
						>
							<Times size={12} color="#566674" />
						</Stack>
					)}
					<Stack cursor="pointer">
						<ChevronDown size={16} color="#566674" />
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default InputDropdown;
