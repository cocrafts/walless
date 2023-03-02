import { FC } from 'react';
import { Image, View } from '@walless/ui';

import Delimiter from './Delimiter';

interface FeaturesWrapperProps {
	children: React.ReactNode;
	className?: string;
}

const FeaturesWrapper: FC<FeaturesWrapperProps> = ({ children, className }) => {
	return (
		<View
			className={`flex flex-row justify-around bg-[#183549] overflow-clip ${className}`}
		>
			<Image
				source={{ uri: '/img/profile-screen/features-pattern-1.png' }}
				className="w-[88px] h-[54px] opacity-30 absolute top-0 left-0 -z-10"
			/>

			<Image
				source={{ uri: '/img/profile-screen/features-pattern-2.png' }}
				className="w-[159px] h-[24px] opacity-30 absolute bottom-0 left-1/2 -translate-x-1/2 -z-10"
			/>

			<Image
				source={{ uri: '/img/profile-screen/features-pattern-3.png' }}
				className="w-[70px] h-[36px] opacity-30 absolute top-0 right-0 -z-10"
			/>

			<Delimiter className="absolute top-0 left-1/4 -translate-x-1/2" />

			<Delimiter className="absolute top-0 left-1/2 -translate-x-1/2" />

			<Delimiter className="absolute top-0 left-3/4 -translate-x-1/2" />

			{children}
		</View>
	);
};

export default FeaturesWrapper;
