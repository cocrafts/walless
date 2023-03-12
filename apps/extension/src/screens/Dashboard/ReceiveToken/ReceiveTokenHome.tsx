import { FC } from 'react';
import { Image, Text, View } from '@walless/ui';

import Header from './Header';
import QRInfo from './QRInfo';
import ShareButton from './ShareButton';

interface ReceiveTokenHomeProps {
	handleCloseModal: () => void;
}

const ReceiveTokenHome: FC<ReceiveTokenHomeProps> = ({ handleCloseModal }) => {
	return (
		<View className="mb-7 w-full" style={{ height: 'calc(100% - 30px)' }}>
			<Header
				title="receive"
				handleCloseModal={handleCloseModal}
				className="mt-5"
			/>
			<View>
				<Image
					className="w-12 h-6 mx-auto mb-1"
					source={{ uri: '/favicon.png' }}
				/>
				<Text className="font-bold text-[6.8px] mx-auto mb-3">WALLESS</Text>
			</View>
			<QRInfo />
			<Text className="font-normal text-[14px] mx-auto">
				0xfu439t279t0hfnjcasv9weug908fw0tu
			</Text>
			<View className="mt-auto">
				<ShareButton
					className="mb-3 w-full mx-auto"
					text="share"
					disable={false}
				/>
				<Text className="font-normal text-[12px] mx-auto [color:#87e6e4]">
					Copy address
				</Text>
			</View>
		</View>
	);
};
export default ReceiveTokenHome;
