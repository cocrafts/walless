import { type FC, useEffect, useRef, useState } from 'react';
import {
	type View as ViewType,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
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
	optionList: string[];
}

const InputDropdown: FC<Props> = ({ title, optionList }) => {
	const [isDropped, setIsDropped] = useState(false);
	const [selectedOption, setSelectedOption] = useState('Select one');
	const [width, setWidth] = useState(0);

	const modalRef = useRef<ViewType>(null);

	useEffect(() => {
		if (isDropped) {
			modalActions.show({
				id: 'dropdown',
				component: () => (
					<Dropdown
						containerWidth={width}
						optionList={optionList}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						setIsDropped={setIsDropped}
					/>
				),
				maskActiveOpacity: 0,
				bindingRef: modalRef,
				bindingDirection: BindDirections.InnerTop,
				positionOffset: {
					x: 0,
					y: -10,
				},
				animateDirection: AnimateDirections.Inner,
			});
		} else {
			modalActions.destroy('dropdown');
		}
	}, [isDropped]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.contentContainer}>
				<View
					ref={modalRef}
					style={styles.selectedOptionContainer}
					onLayout={() => {
						modalRef.current?.measure((_x, _y, _width) => {
							setWidth(_width);
							console.log(_width);
						});
					}}
				>
					<Text>
						{selectedOption === 'Select one' ? 'Select one...' : selectedOption}
					</Text>
					<TouchableOpacity onPress={() => setIsDropped(!isDropped)}>
						<ChevronDown color="#43525F" size={20} />
					</TouchableOpacity>
				</View>
			</View>
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
});
