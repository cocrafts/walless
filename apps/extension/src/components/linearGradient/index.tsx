import {
	LinearGradient as BaseLinearGradent,
	LinearGradientPoint,
} from 'expo-linear-gradient';

interface LinearGradientProps {
	colors: string[];
	locations?: number[] | null;
	start?: LinearGradientPoint | null;
	end?: LinearGradientPoint | null;
	children: JSX.Element | null;
	style?: object | null;
}

export const LinearGradient = (props: LinearGradientProps) => {
	const { colors, locations, start, end, children, style } = props;
	return (
		<BaseLinearGradent
			colors={colors}
			start={start}
			end={end}
			locations={locations}
			style={style}
		>
			{children}
		</BaseLinearGradent>
	);
};
