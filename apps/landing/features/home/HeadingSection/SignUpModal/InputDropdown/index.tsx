import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { ChevronDown } from '@walless/icons';

import Dropdown from './Dropdown';

interface Props {
	title: string;
	currentOption: string;
	setCurrentOption: (option: string) => void;
	optionList: string[];
	error?: string;
}

const InputDropdown: FC<Props> = ({
	title,
	optionList,
	currentOption,
	setCurrentOption,
	error,
}) => {
	const [isDropped, setIsDropped] = useState(false);
	const [width, setWidth] = useState(0);
	const handlePress = () => setIsDropped(!isDropped);

	const modalRef = useRef<TouchableOpacity>(null);

	useEffect(() => {
		if (isDropped) {
			modalActions.show({
				id: 'dropdown',
				component: () => (
					<Dropdown
						containerWidth={width}
						optionList={optionList}
						selectedOption={currentOption}
						setSelectedOption={setCurrentOption}
						setIsDropped={setIsDropped}
					/>
				),
				maskActiveOpacity: 0,
				bindingRef: modalRef as never,
				bindingDirection: BindDirections.InnerTop,
				positionOffset: {
					x: 0,
					y: -10,
				},
				animateDirection: AnimateDirections.Inner,
			});
		} else {
			modalActions.hide('dropdown');
		}
	}, [isDropped]);

	const errorStyle = {
		borderRadius: 15,
		borderColor: '#E34237',
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={[styles.contentContainer, error ? errorStyle : {}]}>
				<TouchableOpacity
					ref={modalRef}
					style={styles.selectedOptionContainer}
					onLayout={() => {
						modalRef.current?.measure((_x, _y, _width) => {
							setWidth(_width);
						});
					}}
					onPress={handlePress}
				>
					<Text>
						{currentOption === 'Select one' ? 'Select one...' : currentOption}
					</Text>
					<ChevronDown color="#43525F" size={20} />
				</TouchableOpacity>
			</View>
			<Text style={styles.error}>{error}</Text>
		</View>
	);
};

export default InputDropdown;

const styles = StyleSheet.create({
	container: {
		gap: 6,
	},
	title: {
		color: '#566674',
	},
	contentContainer: {
		gap: 4,
		zIndex: 999,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	selectedOptionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 14,
		backgroundColor: '#0E141A',
		borderRadius: 14,
	},
	error: {
		marginLeft: 'auto',
		color: '#F04438',
		lineHeight: 14,
		height: 14,
	},
});
