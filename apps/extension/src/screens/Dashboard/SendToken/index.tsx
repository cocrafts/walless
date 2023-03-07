import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	ArrowTopRightIcon,
	Text,
	TimesIcon,
	TouchableOpacity,
	View,
} from '@walless/ui';

import CollectiblesView from './CollectiblesView';
import TokensView from './TokensView';

const SendToken = () => {
	const [isTokensTab, setIsTokensTab] = useState(true);
	const [isAbleToContinue, setIsAbleToContinue] = useState(false);

	return (
		<View className="h-screen bg-[#112C3F] flex justify-between py-5">
			<View>
				<View className="flex flex-row justify-between px-5">
					<View className="flex flex-row justify-start gap-1">
						<ArrowTopRightIcon size={16} color="#29A4D6" />
						<Text className="text-xl">Send</Text>
					</View>

					<Link to="/send-token">
						<TimesIcon size={24} color="white" />
					</Link>
				</View>

				<View className="bg-gradient-to-b from-[#00131F] to-[#112C3F] m-3 rounded-lg flex items-center">
					<View className="flex flex-row gap-3 mt-6 mb-7">
						<Text
							className={`w-[100px] h-5 text-right ${
								isTokensTab && 'font-semibold text-[#1FA1D9]'
							}`}
						>
							Tokens
						</Text>
						<TouchableOpacity
							className="bg-[#001E32] w-12 h-5 border border-[#38576B80] rounded-md p-[3px] flex"
							onPress={() => setIsTokensTab((prev) => !prev)}
						>
							<View
								className={`bg-gradient-to-r from-[#1FA1D9] to-[#72BBC4] w-5 h-3 rounded transition ${
									!isTokensTab && 'translate-x-full'
								}`}
							/>
						</TouchableOpacity>
						<Text
							className={`w-[100px] h-5 ${
								!isTokensTab && 'font-semibold text-[#1FA1D9]'
							}`}
						>
							Collectibles
						</Text>
					</View>

					{isTokensTab ? (
						<TokensView setContinue={setIsAbleToContinue} />
					) : (
						<CollectiblesView />
					)}
				</View>
			</View>

			<TouchableOpacity
				className={`h-12 mx-6 bg-gradient-to-r rounded-lg flex justify-center items-center ${
					isAbleToContinue
						? 'from-[#1FA1D9] to-[#72BBC4]'
						: 'from-[#C1C1C133] to-[#71727233]'
				}`}
				disabled={!isAbleToContinue}
			>
				<Text
					className={`font-medium ${
						isAbleToContinue ? 'text-white' : 'text-[#587A90]'
					}`}
				>
					Continue
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SendToken;
