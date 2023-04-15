import { FC } from 'react';
import { FeatureButton } from '@walless/app';
import { Stack } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight, Cart, Swap } from '@walless/icons';

interface Props {
	onPressSendBtn: () => void;
}

const MainFeatures: FC<Props> = ({ onPressSendBtn }) => {
	return (
		<Stack display="flex" flexDirection="row" gap={18}>
			<FeatureButton title="Send" onPress={onPressSendBtn}>
				<ArrowTopRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Receive" onPress={() => console.log('Receive')}>
				<ArrowBottomRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Buy" onPress={() => console.log('Buy')}>
				<Cart size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Swap" onPress={() => console.log('Swap')}>
				<Swap size={iconSize} />
			</FeatureButton>
		</Stack>
	);
};

export default MainFeatures;

const iconSize = 18;
