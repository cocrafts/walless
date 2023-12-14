import type { FC } from 'react';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import {
	AnimateDirections,
	AnimatedView,
	BindDirections,
	Hoverable,
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
	const rotation = useSharedValue(0);
	const chevronAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	}, [rotation]);
	const borderAnimatedStyle = useAnimatedStyle(() => {
		const borderColor = interpolateColor(
			rotation.value,
			[-180, 0],
			['#43525f', 'transparent'],
			'RGB',
		);
		return {
			borderColor,
		};
	}, [rotation]);

	const handlePress = () => {
		rotation.value = withTiming(-180);
		modalActions.show({
			id: 'dropdown',
			component: Dropdown,
			maskActiveOpacity: 0,
			bindingRef: modalRef as never,
			bindingDirection: BindDirections.Bottom,
			positionOffset: {
				x: 0,
			},
			animateDirection: AnimateDirections.Bottom,
			context: {
				optionList,
				selectedOption: currentOption,
				setSelectedOption: setCurrentOption,
			},
			updater: () => (rotation.value = withTiming(0)),
		});
	};

	const modalRef = useRef(null);

	const errorStyle = {
		borderRadius: 15,
		borderColor: '#E34237',
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Hoverable
				ref={modalRef}
				style={[
					styles.selectedOptionContainer,
					borderAnimatedStyle,
					error ? errorStyle : {},
				]}
				onPress={handlePress}
			>
				<Text>
					{currentOption === 'Select one' ? 'Select one...' : currentOption}
				</Text>
				<AnimatedView style={chevronAnimatedStyle}>
					<ChevronDown color="#43525F" size={20} />
				</AnimatedView>
			</Hoverable>
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
	selectedOptionContainer: {
		borderWidth: 1,
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
