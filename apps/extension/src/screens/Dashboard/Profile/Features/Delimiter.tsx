import { FC } from 'react';
import { Image, View } from '@walless/ui';

interface DelimiterProps {
	className?: string;
}

const Delimiter: FC<DelimiterProps> = ({ className }) => {
	return (
		<View className={`h-full flex justify-between items-center ${className}`}>
			<Image
				source={{ uri: '/img/profile-screen/features-delimiter-bottom.png' }}
				className="w-[17px] h-[4px]"
			/>

			<View className="h-8 w-[1px] bg-[#84A6BB4D]"></View>

			<Image
				source={{ uri: '/img/profile-screen/features-delimiter-top.png' }}
				className="w-[17px] h-[4px]"
			/>
		</View>
	);
};

export default Delimiter;
