import type { FC } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import type { ModalConfigs } from '@walless/gui';
import { modalActions, Text, View } from '@walless/gui';

interface DropdownContext {
	optionList: string[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
}

interface Props {
	config: ModalConfigs;
}

const Dropdown: FC<Props> = ({ config }) => {
	const { optionList, selectedOption, setSelectedOption } =
		config.context as DropdownContext;

	const handleCloseModal = () => {
		modalActions.hide(config.id as string);
	};

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);
		handleCloseModal();
	};

	return (
		<View>
			<ScrollView
				style={styles.dropdownContainer}
				showsVerticalScrollIndicator={false}
			>
				<Text style={[styles.optionContainer, { color: '#566674' }]}>
					Select one
				</Text>
				{optionList.map((option, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.optionContainer,
							selectedOption === option && styles.selectedStyle,
						]}
						onPress={() => handleSelectOption(option)}
					>
						<Text style={styles.option}>{option}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	selectedOptionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 14,
		backgroundColor: '#0E141A',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#43525F',
	},
	dropdownContainer: {
		maxHeight: 200,
		borderWidth: 1,
		borderColor: '#43525F',
		backgroundColor: '#0E141A',
		borderRadius: 14,
		overflow: 'hidden',
		marginTop: 4,
	},
	optionContainer: {
		padding: 14,
	},
	option: {
		color: '#ffffff',
	},
	selectedStyle: {
		backgroundColor: '#1F2A34',
	},
});
