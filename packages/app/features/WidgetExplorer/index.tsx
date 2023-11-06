import { type FC, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import type { Config, UserProfile } from '@walless/core';
import { runtime } from '@walless/core';

import Carousel from '../../components/Carrousel';
import Pagination from '../../components/Pagination';

import Header from './components/Header';
import MissionBox from './components/MissionBox';
import type { MissionBoxType } from './internal';
import { missionBoxWidth, mockMission } from './shared';

interface Props {
	profile: UserProfile;
	appConfig: Config;
}

export const WidgetExplorerFeat: FC<Props> = ({ profile, appConfig }) => {
	const { hideBalance } = appConfig;
	const { name } = profile;
	const { isMobile } = runtime;
	const carouselRef = useRef<{ toIndex: (index: number) => void }>();
	const onPaginationPress = (index: number) => {
		carouselRef.current?.toIndex(index);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header userName={name} hideBalance={hideBalance} />
			<Carousel
				ref={carouselRef}
				style={styles.carouselContainer}
				data={mockMission}
				itemWidth={missionBoxWidth + 10}
				gestureEnabled={isMobile}
				loop={!isMobile}
				renderItem={(item, index) => {
					const { title, colors } = item as MissionBoxType;
					return (
						<MissionBox key={index} title={title} colors={colors} idx={index} />
					);
				}}
			/>
			{!isMobile && (
				<Pagination
					data={mockMission}
					carouselItemWidth={missionBoxWidth + 10}
					onPress={onPaginationPress}
					style={styles.paginationContainer}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
	},
	topContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	separatedLine: {
		borderBottomColor: '#24303a',
		borderBottomWidth: 1,
	},
	carouselContainer: {
		marginLeft: 15,
		marginTop: 15,
	},
	paginationContainer: {
		marginHorizontal: 'auto',
	},
});

export default WidgetExplorerFeat;