import { FC } from 'react';
import { Image, Text, View } from '@walless/ui';
import { requestType } from 'utils/config';

import { RuleProps } from '.';
interface RequestTypeProps {
	typeRequest: string;
	rules?: RuleProps[];
}

const RequestBox: FC<RequestTypeProps> = ({ typeRequest, rules }) => {
	return (
		<View className=" mx-[23px]	">
			{typeRequest == requestType.connectionRequest ? (
				<View className="bg-[#01131F] rounded-[8px] border border-solid border-[#01131F] px-4 py-[5px] mb-[40px]">
					<Text
						style={{ color: 'rgba(255,255,255,0.6)' }}
						className="px-8 text-center pb-[10px] font-[300] text-[12px]"
					>
						Under Realm would like to connect with your Walless account to:
					</Text>
					<View className="mb-3 bg-[#2A4C63] rotate-[0.07deg] w-full h-[1px] mx-auto "></View>
					{rules?.map((item, index) => {
						return (
							<View
								key={`coneectionReqeust-${index}`}
								className="mb-[5px] flex flex-row gap-2 items-center px-2"
							>
								<Image
									className="w-[14px] h-[14px]"
									source={{ uri: item.icon }}
								/>
								<Text className="text-[14px] font-[300]">
									{item.description}
								</Text>
							</View>
						);
					})}
				</View>
			) : typeRequest == requestType.signatureRequest ? (
				<View className="bg-[#01131F] rounded-[8px] border border-solid border-[#01131F] px-[19px] py-[10px] mb-10">
					<Text
						style={{ color: 'rgba(255,255,255,0.6)' }}
						className="px-[20px] text-center pb-[10px] font-[300] text-[12px]"
					>
						Your signature has been requested
					</Text>
					<View className="bg-[#88c3bf1a] rounded-[10px] py-2 px-3">
						<View className="flex flex-row align-items-center justify-between w-full mb-1">
							<Text className="text-[12px]">Message</Text>
							<Image
								className="w-[12px] h-[12px]"
								source={{ uri: '/img/request-screen/exclamation_image.png' }}
							/>
						</View>
						<View className="mb-3 bg-[#2A4C63]  w-full h-[1px] mx-auto "></View>
						<Text className="text-[10px]">
							[Custom message] Sign this message to prove that you have accessed
							to this wallet account and we’ll log you in. This won’t cost you
							anything! [Seal code: r3092850297]
						</Text>
					</View>
				</View>
			) : (
				<View className="bg-[#01131F] rounded-[8px] border border-solid border-[#01131F] px-[19px] py-[10px] mb-10">
					<Text className="mx-auto max-w-[290px] text-center pb-[10px] font-[300] text-[12px]">
						Under Realm would like to add its custom layout appearance to your
						Walless account.
					</Text>
					<View className="mx-auto flex flex-row items-center justify-center gap-2">
						<Text className="text-[12px]" style={{ color: '#1BA0DA' }}>
							Learn more
						</Text>
						<Image
							className="w-[10px] h-[10px]"
							source={{ uri: '/img/request-screen/arrow_up_right.png' }}
						/>
					</View>
				</View>
			)}
		</View>
	);
};
export default RequestBox;
