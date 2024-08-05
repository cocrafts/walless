import type { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@walless/gui';
import { sharedStyles } from 'utils/style';

interface Props {
	tabs: string[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const TabSelect: FC<Props> = ({ tabs, activeTab, setActiveTab }) => {
	return (
		<View style={[sharedStyles.flexRow, sharedStyles.gap8]}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab}
					style={[
						styles.tabContainer,
						tab === activeTab ? styles.activeTabContainer : {},
					]}
					onPress={() => setActiveTab(tab)}
				>
					<Text
						style={
							tab === activeTab ? styles.activeTabText : styles.inactiveTabText
						}
					>
						{tab}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default TabSelect;

const styles = StyleSheet.create({
	tabContainer: {
		paddingBottom: 4,
		borderBottomWidth: 1,
		borderColor: 'transparent',
	},
	activeTabContainer: {
		borderColor: '#17A3E1',
	},
	activeTabText: {
		...sharedStyles.fontSize13,
		fontWeight: '500',
	},
	inactiveTabText: {
		...sharedStyles.fontSize13,
		...sharedStyles.textNeutral5,
	},
});
