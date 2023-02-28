import { FC } from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
	size?: number;
	color?: string;
}

const IconSearch: FC<Props> = ({ size, color }) => {
	return (
		<svg
			width={size || 24}
			height={size || 24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				opacity={0.1}
				d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
				fill={color || '#000'}
			/>
			<path
				d="m15 15 6 6"
				stroke={color || '#000'}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
				stroke={color || '#000'}
				strokeWidth={2}
			/>
		</svg>
	);
};

export default IconSearch;
