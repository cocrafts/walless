import { type FC, useState } from 'react';
import { ChevronDown } from '@walless/icons';
import { Button, Stack, Text } from '@walless/ui';

import DropdownOption from './DropdownOption';
import SelectedOption from './SelectedOption';

interface Props {
	options: DropdownOptionProps[];
	activeOptions: DropdownOptionProps[];
	setActiveOptions: (options: DropdownOptionProps[]) => void;
}

export interface DropdownOptionProps {
	id: string;
	icon: string;
	label: string;
}

const MultiOptionsDropdown: FC<Props> = ({
	options,
	activeOptions,
	setActiveOptions,
}) => {
	const [expanded, setExpanded] = useState(false);

	const handleToggleDropdown = () => setExpanded(!expanded);

	const toggleOption = (option: DropdownOptionProps) => {
		if (activeOptions.find((activeOption) => activeOption.id === option.id))
			setActiveOptions(
				activeOptions.filter((activeOption) => activeOption.id !== option.id),
			);
		else setActiveOptions([...activeOptions, option]);
	};

	const isEmpty = activeOptions.length === 0;

	return (
		<Stack gap={12}>
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems={!isEmpty ? 'flex-start' : 'center'}
				backgroundColor="#19232C"
				padding={6}
				borderRadius={8}
			>
				<Stack
					flexDirection="row"
					flexWrap="wrap"
					columnGap={4}
					rowGap={8}
					flex={1}
				>
					{!isEmpty ? (
						activeOptions.map((option) => (
							<SelectedOption
								key={option.id}
								option={option}
								toggleOption={toggleOption}
							/>
						))
					) : (
						<Text color="#566674">Select an option</Text>
					)}
				</Stack>

				<Button
					padding={4}
					backgroundColor="transparent"
					onPress={handleToggleDropdown}
				>
					<ChevronDown color="#566674" size={20} />
				</Button>
			</Stack>

			{expanded && (
				<Stack
					backgroundColor="#19232C"
					borderRadius={8}
					borderWidth={1}
					borderColor="#2C3741"
					position="absolute"
					top="calc(100% + 8px)"
					width="100%"
					zIndex={1}
				>
					{options.map((option) => (
						<DropdownOption
							key={option.id}
							option={option}
							active={
								!!activeOptions.find(
									(activeOption) => activeOption.id === option.id,
								)
							}
							toggleOption={toggleOption}
						/>
					))}
				</Stack>
			)}
		</Stack>
	);
};

export default MultiOptionsDropdown;
