import React, { useState } from 'react';
import {
	Button,
	EyeOffIcon,
	EyeOnIcon,
	Image,
	ImageBackground,
	Text,
	ThreeDots,
	TouchableOpacity,
	View,
} from '@walless/ui';
import SendToken from 'screens/Dashboard/SendToken';
import { resources } from 'utils/config';
import { modalActions } from 'utils/state/modal';

import { TokenMetadata } from './internal';

interface Props {
	token: TokenMetadata;
}

export const TokenCard: React.FC<Props> = ({ token }) => {
	const [isPrivate, setIsPrivate] = useState(false);
	const eyeIconSize = 18;
	const eyeIconColor = '#ffffff';

	const balance = isPrivate ? (
		<Text className="text-2xl">45</Text>
	) : (
		<Text className="font-light tracking-widest text-2xl">******</Text>
	);

	const eyeIcon = isPrivate ? (
		<EyeOnIcon size={eyeIconSize} color={eyeIconColor} />
	) : (
		<EyeOffIcon size={eyeIconSize} color={eyeIconColor} />
	);

	const onEyeIconPress = () => {
		setIsPrivate(!isPrivate);
	};

	const onSendTokenPress = () => {
		modalActions.show({
			id: 'sendToken',
			component: SendToken,
		});
	};

	return (
		<ImageBackground
			key={token.address}
			className="w-[300px] aspect-[311/153] ml-4 p-3 flex-row rounded-xl overflow-hidden"
			source={resources.underRealm.tokenCardBg}
		>
			<View>
				<Text className="font-bold">{`${token.name} (${token.symbol})`}</Text>
				<View className="flex-1 justify-center">
					<View className="flex-row">
						<View className="w-[90px]">{balance}</View>
						<TouchableOpacity
							className="opacity-50 ml-3 w-[20px] h-[20px] justify-center items-center"
							onPress={onEyeIconPress}
						>
							{eyeIcon}
						</TouchableOpacity>
					</View>
					<Text className="opacity-50">~ 000.0 USD</Text>
				</View>
				<View className="flex-row">
					<Button
						className="bg-[color:#20110D] py-2 mr-2 rounded-lg flex-1"
						titleClass="text-xs text-center"
						title="Send"
						onPress={onSendTokenPress}
					/>
					<TouchableOpacity>
						<View className="bg-[color:#20110D] w-8 aspect-square rounded-lg items-center justify-center">
							<ThreeDots size={17} color="#ffffff" />
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View className="flex-1 justify-end pl-1">
				<Image source={token.icon} className="w-full aspect-[96/78]" />
			</View>
		</ImageBackground>
	);
};

export default TokenCard;
