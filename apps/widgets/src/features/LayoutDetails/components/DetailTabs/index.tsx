import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import BulletSeparator from 'components/BulletSeparator';

import TabTitle from './components/TabTitle';
import type { CommentProps } from './CommentsTab';
import CommentsTab from './CommentsTab';
import type { InfoProps } from './InformationTab';
import InformationTab from './InformationTab';
import ScreenshotsTab from './ScreenshotsTab';

interface Props {
	screenshots: string[];
	information: InfoProps;
	comments: CommentProps[];
}

const DetailsTab: FC<Props> = ({ screenshots, information, comments }) => {
	const [activeTab, setActiveTab] = useState('Screenshots');
	const [bulletPosition, setBulletPosition] = useState(348);
	const [bulletSize, setBulletSize] = useState(110);

	const tabList: string[] = ['Screenshots', 'Information', 'Comments'];

	const bulletSeparateStyle = {
		paddingLeft: bulletPosition,
	};

	useEffect(() => {
		let sum = 0;
		let index = 0;
		for (let i = 0; i < tabList.length; i++) {
			if (tabList[i] === activeTab) {
				index = i;
				break;
			} else {
				sum += tabList[i].length * 10;
			}
		}
		setBulletSize(activeTab.length * 10);
		setBulletPosition(348 + index * 60 + sum);
	}, [activeTab]);

	return (
		<View style={styles.container}>
			<View style={styles.tabContainer}>
				<View style={styles.tabTitleContainer}>
					<TabTitle
						title="Screenshots"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>

					<TabTitle
						title="Information"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>

					<TabTitle
						title="Comments"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
				</View>

				<BulletSeparator
					style={bulletSeparateStyle}
					noBullet={false}
					bulletHeight={3}
					bulletWidth={bulletSize}
				/>
			</View>

			<View style={styles.tabContentContainer}>
				{activeTab === 'Screenshots' && (
					<ScreenshotsTab imageList={screenshots} />
				)}
				{activeTab === 'Information' && <InformationTab {...information} />}
				{activeTab === 'Comments' && <CommentsTab comments={comments} />}
			</View>
		</View>
	);
};

export default DetailsTab;

const styles = StyleSheet.create({
	container: {
		gap: 60,
	},
	tabContainer: {
		gap: 20,
	},
	tabTitleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 60,
	},
	tabTitle: {
		color: '#566674',
		fontSize: 18,
		fontWeight: '500',
	},
	tabContentContainer: {
		flex: 1,
		backgroundColor: '#202D38',
		borderRadius: 16,
		padding: 36,
	},
});
