import { FC, useEffect, useRef, useState } from 'react';
import { BindDirections, modalActions } from '@walless/app';
import { Input, Stack } from '@walless/gui';
import { ChevronDown, Times } from '@walless/icons';
import { tokens } from 'screens/Test/internal';

import Dropdown from './Dropdown';

interface Props {
	sourceList?: unknown[];
	selectedItem?: unknown;
	filteredList?: unknown[];
	numberOfAppearItems?: number;
	placeholder?: string;
}

const InputDropdown: FC<Props> = ({
	sourceList,
	selectedItem,
	filteredList,
	numberOfAppearItems,
	placeholder,
}) => {
	const [isActive, setIsActive] = useState(false);
	const inputRef = useRef(null);

	const handleClick = () => {
		setIsActive(true);
		modalActions.show({
			id: 'dropdown',
			component: Dropdown,
			context: {
				items: tokens,
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
					onFocus={handleClick}
					onBlur={() => {
						setIsActive(false);
					}}
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
