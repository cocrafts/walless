import { Defs, G, Svg } from 'react-native-svg';

export const BlueCircleBackground = () => {
	return (
		<Svg width="308" height="174" viewBox="0 0 308 174" fill="none">
			<G opacity="0.8" filter="url(#filter0_f_14670_15152)">
				<circle cx="154" cy="87" r="120" fill="#17A3E1" />
			</G>
			<Defs>
				<filter
					id="filter0_f_14670_15152"
					x="0"
					y="-67"
					width="308"
					height="308"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feGaussianBlur
						stdDeviation="17"
						result="effect1_foregroundBlur_14670_15152"
					/>
				</filter>
			</Defs>
		</Svg>
	);
};
