import type { FC } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { modalActions, Text, View } from '@walless/gui';
import { ChevronUp } from '@walless/icons';

interface Props {
	containerWidth: number;
	optionList: string[];
	setSelectedOption: (option: string) => void;
	selectedOption: string;
	setIsDropped: (isDropped: boolean) => void;
}

const Dropdown: FC<Props> = ({
	containerWidth,
	optionList,
	selectedOption,
	setSelectedOption,
	setIsDropped,
}) => {
	const handleSelectOption = (option: string) => {
		setSelectedOption(option);
		setIsDropped(false);
		modalActions.hide('dropdown');
	};

	return (
		<View style={{ width: containerWidth }}>
			<View style={styles.selectedOptionContainer}>
				<Text>
					{selectedOption === 'Select one' ? 'Select one...' : selectedOption}
				</Text>
				<TouchableOpacity onPress={() => setIsDropped(false)}>
					<ChevronUp color="#43525F" size={20} />
				</TouchableOpacity>
			</View>
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
		width: '100%',
		maxHeight: 200,
		borderWidth: 1,
		borderColor: '#43525F',
		backgroundColor: '#0E141A',
		borderRadius: 14,
		overflow: 'hidden',
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