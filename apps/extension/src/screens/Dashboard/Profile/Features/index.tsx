import { FC } from 'react';
import {
	ArrowBottomRightIcon,
	ArrowTopRightIcon,
	CartIcon,
	SwapIcon,
} from '@walless/ui';

import FeatureButton from './FeatureButton';
import FeaturesWrapper from './FeaturesWrapper';

export interface FeatureButtonProps {
	title: string;
	icon: React.ReactNode;
	onPress: () => void;
}

interface FeaturesProps {
	className?: string;
}

const mockFeatureButtons: FeatureButtonProps[] = [
	{
		title: 'Send',
		icon: <ArrowTopRightIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Send');
		},
	},
	{
		title: 'Receive',
		icon: <ArrowBottomRightIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Receive');
		},
	},
	{
		title: 'Buy',
		icon: <CartIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Buy');
		},
	},
	{
		title: 'Swap',
		icon: <SwapIcon color="#29A4D6" size={12} />,
		onPress: () => {
			console.log('Swap');
		},
	},
];

const Features: FC<FeaturesProps> = ({ className }) => {
	return (
		<FeaturesWrapper className={className}>
			{mockFeatureButtons.map((button) => (
				<FeatureButton key={button.title} {...button} />
			))}
		</FeaturesWrapper>
	);
};

export default Features;
