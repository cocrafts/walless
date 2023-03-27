import { FC } from 'react';
import { View } from 'react-native';

import { ModalConfigs } from '../../utils/state/modal';

interface Props {
	item: ModalConfigs;
}

export const ModalContainer: FC<Props> = ({ item }) => {
	const { component: InnerComponent } = item;

	return (
		<View>
			<InnerComponent config={item} />
		</View>
	);
};
