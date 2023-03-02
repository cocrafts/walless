import { FC } from 'react';
import { Image, View } from '@walless/ui';

interface WallessBackgroundProps {
	children: React.ReactNode;
	className?: string;
}

const WallessBanner: FC<WallessBackgroundProps> = ({ children, className }) => {
	return (
		<View
			className={`bg-gradient-to-r min-h-[135px] from-[#1BA0DA] to-[#83C1C0] ${className}`}
		>
			<Image
				source={{ uri: '/img/profile-screen/banner-pattern.png' }}
				className="w-[198px] h-[135px] absolute top-0 right-0 -z-10"
			/>
			{children}
		</View>
	);
};

export default WallessBanner;
