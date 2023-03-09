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
/**
 *
 * @param {string[]} colors array colors like [{"#1","#2"}]
 * @param {number[] | null} locations width for each color
 * @param {LinearGradientPoint|null} start start point
 * @param {LinearGradientPoint | null} end end point
 * @param {object | null} style style object
 * @returns {JSX.Element}
 */
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
