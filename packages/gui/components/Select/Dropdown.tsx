import { type FC } from 'react';
import {
	Hoverable,
	modalActions,
	ModalConfigs,
	Text,
	View,
} from '@walless/gui';

import DropdownItem from './DropdownItem';
import { SelectionContext, styles as mutualStyles } from './shared';

interface Props {
	config: ModalConfigs;
}

const Dropdown: FC<Props> = ({ config }) => {
	const { selected, items, title, getRequiredFields, onSelect } =
		config.context as SelectionContext<object>;

	const handleMainButtonPress = () => {
		modalActions.hide(`dropdown-${title}`);
	};

	const handleItemPress = (item: object) => {
		onSelect(item);
		modalActions.hide(`dropdown-${title}`);
	};

	return (
		<View>
			<Hoverable style={mutualStyles.button} onPress={handleMainButtonPress}>
				<Text style={mutualStyles.text}>{title}</Text>
			</Hoverable>
			<View>
				{items.map((item, index) => {
					const { id, name, icon } = getRequiredFields(item);
					return (
						<DropdownItem
							selected={selected && getRequiredFields(selected).id === id}
							key={index}
							name={name}
							icon={icon}
							onPress={() => handleItemPress(item)}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default Dropdown;
