import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Image, Text, View } from '@walless/ui';

export interface TagProps {
	tagIcon: ImageSourcePropType;
	tagName: string;
	className?: string;
	backgroundColor?: string;
	textColor?: string;
}

const Tag: FC<TagProps> = ({
	tagIcon,
	tagName,
	className,
	backgroundColor,
	textColor,
}) => {
	textColor = textColor ? `[color:${textColor}]` : 'text-white';
	backgroundColor = backgroundColor ? `bg-${backgroundColor}` : 'bg-[#1E1D1D]';

	return (
		<View
			className={`
			flex-row
			justify-center
			items-center
			gap-[2px]
			rounded-3xl
			h-4
			px-2
			py-1
			${backgroundColor}
			${className ? className : ''}
		`}
		>
			<Image source={tagIcon} className="w-2 h-2 rounded-full" />
			<Text className={`text-[8px] font-semibold ${textColor}`}>{tagName}</Text>
		</View>
	);
};

export default Tag;
