import type { FC } from 'react';
import { useState } from 'react';
import { Button, Text, View } from '@walless/gui';
import { ChevronDown } from '@walless/icons';

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
		<View>
			<View>
				<View>
					{!isEmpty ? (
						activeOptions.map((option) => (
							<SelectedOption
								key={option.id}
								option={option}
								toggleOption={toggleOption}
							/>
						))
					) : (
						<Text>Select an option</Text>
					)}
				</View>

				<Button
					style={{
						backgroundColor: 'transparent',
					}}
					onPress={handleToggleDropdown}
				>
					<ChevronDown color="#566674" size={20} />
				</Button>
			</View>

			{expanded && (
				<View>
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
				</View>
			)}
		</View>
	);
};

export default MultiOptionsDropdown;
