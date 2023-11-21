import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import BlogCard from '../BlogCard';
import type { Blog } from '../internal';
import { blogs } from '../internal';
import type { IndicatorOption, SlideOption } from '../Slider';
import Slider from '../Slider';
import Indicator from '../Slider/Indicator';

interface Props {
	listOfBlogs: Blog[];
}

const SlidingSection: FC<Props> = ({ listOfBlogs }) => {
	const [slidingLayout, setSlidingLayout] = useState<ViewStyle | null>(null);

	const convertBlogToSlideOption = (
		blogs: Blog[],
		style?: ViewStyle,
	): SlideOption[] => {
		return blogs.map(
			({ id, title, category, date, description, coverImage }, index) => {
				return {
					id: index.toString(),
					component: () => (
						<BlogCard
							key={id}
							style={style}
							id={id}
							title={title}
							category={category}
							coverImage={coverImage}
							description={description}
							date={date}
						/>
					),
				};
			},
		);
	};

	const [slidingList, setSlidingList] = useState<SlideOption[]>(
		convertBlogToSlideOption(
			listOfBlogs.slice(blogs.length - 3),
			slidingLayout ?? {},
		),
	);

	const indicator: IndicatorOption = {
		id: 'indicator',
		component: Indicator,
		context: { cardList: slidingList.reverse() },
	};

	useEffect(() => {
		setSlidingList(
			convertBlogToSlideOption(
				listOfBlogs.slice(listOfBlogs.length - 3),
				slidingLayout ?? {},
			),
		);
	}, [listOfBlogs, slidingLayout]);

	return (
		<View
			style={styles.container}
			onLayout={(event) => {
				setSlidingLayout({
					width: event.nativeEvent.layout.width,
				});
			}}
		>
			<Slider
				style={styles.container}
				items={slidingList.reverse()}
				indicator={indicator}
			/>
		</View>
	);
};

export default SlidingSection;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
});
