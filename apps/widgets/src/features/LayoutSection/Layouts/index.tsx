import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import { type LayoutProps } from '../../internal';

import LayoutCard from './LayoutCard';

interface Props {
	typeOfLayout: string;
	listOfLayouts: LayoutProps[];
	activeLayoutId: string | null;
	setActiveLayoutId: (id: string | null) => void;
}

const Layouts: FC<Props> = ({
	typeOfLayout,
	listOfLayouts,
	activeLayoutId,
	setActiveLayoutId,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.typeOfLayout}>{typeOfLayout}</Text>

			<View style={styles.layoutsContainer}>
				{listOfLayouts.map((layout) => (
					<LayoutCard
						key={layout.id}
						layout={layout}
						activeLayoutId={activeLayoutId}
						setIsActiveId={setActiveLayoutId}
					/>
				))}
			</View>
		</View>
	);
};

export default Layouts;

const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
	layoutsContainer: {
		gap: 16,
		flexDirection: 'row',
	},
	typeOfLayout: {
		fontSize: 30,
		fontWeight: '600',
		color: '#ffffff',
	},
});
