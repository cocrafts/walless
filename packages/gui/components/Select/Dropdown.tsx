import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { Search as SearchIcon } from '@walless/icons';
import { throttle } from 'lodash';

import type { ModalConfigs } from '../../';
import { modalActions, Text, View } from '../../';

import DropdownItem from './DropdownItem';
import type { SelectionContext } from './shared';
import { styles as mutualStyles } from './shared';

interface Props {
	config: ModalConfigs;
}

const Dropdown: FC<Props> = ({ config }) => {
	const {
		selected,
		items,
		title,
		notFoundText,
		getRequiredFields,
		onSelect,
		itemStyle = {},
		itemIconStyle = {},
	} = config.context as SelectionContext<object>;

	const [searchText, setSearchText] = useState('');

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			if (searchText.length == 0) return true;
			const { name } = getRequiredFields(item);
			return name.toLowerCase().includes(searchText.toLowerCase());
		});
	}, [searchText]);

	const handleItemPress = (item: object) => {
		onSelect(item);
		modalActions.hide(`dropdown-${title}`);
	};

	return (
		<View>
			<View style={styles.dropdownContainer}>
				<View style={[mutualStyles.button, mutualStyles.focus, styles.input]}>
					<SearchIcon size={17} color="#566674" />
					<TextInput
						style={styles.inputText}
						placeholder="Search"
						onChangeText={throttle((text) => setSearchText(text), 200)}
						placeholderTextColor="#566674"
					/>
				</View>

				{filteredItems.length == 0 ? (
					<View style={styles.notFoundView}>
						<View style={styles.notFoundIconBlock}>
							<SearchIcon size={17} color="#566674" />
						</View>
						<Text>{notFoundText || "We don't support this token yet!"}</Text>
					</View>
				) : (
					<ScrollView
						style={{
							height: 200,
						}}
						showsVerticalScrollIndicator={false}
					>
						{filteredItems.map((item, index) => {
							const { id, name, icon } = getRequiredFields(item);
							return (
								<DropdownItem
									key={index}
									name={name ?? 'Unknown'}
									icon={icon}
									selected={!!selected && getRequiredFields(selected).id === id}
									onPress={() => handleItemPress(item)}
									style={itemStyle}
									iconStyle={itemIconStyle}
								/>
							);
						})}
					</ScrollView>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	dropdownContainer: {
		flexDirection: 'column',
		backgroundColor: '#0E141A',
		borderRadius: 15,
		marginTop: 10,
		paddingHorizontal: 7,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#49596A',
	},
	input: {
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	inputText: {
		flex: 1,
	},
	notFoundView: {
		height: 150,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	notFoundIconBlock: {
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
