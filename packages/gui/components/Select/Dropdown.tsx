import { type FC, useMemo, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ChevronUp, Search as SearchIcon } from '@walless/icons';
import { throttle } from 'lodash';

import { Hoverable, modalActions, ModalConfigs, Text, View } from '../../';

import DropdownItem from './DropdownItem';
import { SelectionContext, styles as mutualStyles } from './shared';

interface Props {
	config: ModalConfigs;
}

const Dropdown: FC<Props> = ({ config }) => {
	const { selected, items, title, getRequiredFields, onSelect } =
		config.context as SelectionContext<object>;

	const [searchText, setSearchText] = useState('');

	const filterdItems = useMemo(() => {
		return items.filter((item) => {
			if (searchText.length == 0) return true;
			const { name } = getRequiredFields(item);
			return name.toLowerCase().includes(searchText.toLowerCase());
		});
	}, [searchText]);

	const handleMainButtonPress = () => {
		modalActions.hide(`dropdown-${title}`);
	};

	const handleItemPress = (item: object) => {
		onSelect(item);
		modalActions.hide(`dropdown-${title}`);
	};

	return (
		<View style={styles.container}>
			<Hoverable
				style={[mutualStyles.button, mutualStyles.focus]}
				onPress={handleMainButtonPress}
			>
				<Text style={mutualStyles.text}>{title}</Text>
				<View style={mutualStyles.rightIcon}>
					<ChevronUp size={16} color="#566674" />
				</View>
			</Hoverable>

			<View
				style={[
					mutualStyles.button,
					mutualStyles.focus,
					styles.dropdownContainer,
				]}
			>
				<View style={[mutualStyles.button, mutualStyles.focus, styles.input]}>
					<SearchIcon size={17} color="#566674" />
					<TextInput
						style={styles.inputText}
						placeholder="Search"
						onChangeText={throttle((text) => setSearchText(text), 200)}
						placeholderTextColor="#566674"
					/>
				</View>

				{filterdItems.map((item, index) => {
					const { id, name, icon } = getRequiredFields(item);
					return (
						<DropdownItem
							key={index}
							name={name}
							icon={icon}
							selected={!!selected && getRequiredFields(selected).id === id}
							onPress={() => handleItemPress(item)}
							style={styles.item}
						/>
					);
				})}

				{filterdItems.length == 0 && (
					<View style={styles.notFoundView}>
						<View style={styles.notFoundIconBlock}>
							<SearchIcon size={17} color="#566674" />
						</View>
						<Text>{"We don't support this token yet!"}</Text>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	dropdownContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#0E141A',
		borderRadius: 15,
		marginTop: 10,
		alignItems: 'center',
		paddingHorizontal: 7,
	},
	input: {
		width: 308,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	inputText: {
		flex: 1,
	},
	notFoundView: {
		height: 150,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	notFoundIconBlock: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: 50,
		backgroundColor: '#19232C',
		borderRadius: 10,
	},
	item: {},
});

export default Dropdown;
