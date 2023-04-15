import { FC, useRef, useState } from 'react';
import { BindDirections, modalActions } from '@walless/app';
import { Input, Stack } from '@walless/gui';
import { ChevronDown, Times } from '@walless/icons';
import { tokens } from 'screens/Test/internal';

import Dropdown from './Dropdown';
import { DropdownItemProps } from 'screens/Test/internal';

interface Props {
	sourceList?: unknown[];
	filteredList?: unknown[];
	numberOfAppearItems?: number;
	placeholder?: string;
}

const InputDropdown: FC<Props> = ({
	sourceList,
	filteredList,
	numberOfAppearItems,
	placeholder,
}) => {
	const [isActive, setIsActive] = useState(false);
	const [selectedItem, setSelectedItem] = useState<DropdownItemProps | null>(
		null,
	);
	const inputRef = useRef(null);

	const handleSelectItem = (item: DropdownItemProps) => {
		setSelectedItem(item);
		setIsActive(false);
		modalActions.destroy('dropdown');
	};

	console.log('Parent', selectedItem);

	const handleClick = () => {
		modalActions.show({
			id: 'dropdown',
			component: Dropdown,
			context: {
				items: tokens,
				setChosen: handleSelectItem,
				selectedItem: selectedItem,
			},
			bindingDirection: BindDirections.Bottom,
			maskActiveOpacity: 0,
			bindingRef: inputRef,
		});
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
				ref={inputRef}
			>
				<Input
					flexGrow={1}
					justifyContent="center"
					alignItems="center"
					backgroundColor="transparent"
					borderColor="transparent"
					focusStyle={{ borderColor: 'transparent' }}
					placeholder="Search"
					onPress={handleClick}
					zIndex={1}
					onFocus={() => setIsActive(true)}
					onBlur={() => setIsActive(false)}
				/>
				<Stack
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						backgroundColor="#1E2830"
						width={16}
						height={16}
						borderRadius={16}
						cursor="pointer"
					>
						<Times size={12} color="#566674" />
					</Stack>
					<Stack cursor="pointer">
						<ChevronDown size={16} color="#566674" />
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default InputDropdown;
