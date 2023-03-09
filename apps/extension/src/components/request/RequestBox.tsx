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
		<View className="w-full">
			{typeRequest == requestType.connectionRequest ? (
				<View className="mx-[23px] bg-[#01131F] rounded-[8px] border border-solid border-[#01131F] px-[8px] py-[5px] mb-[40px]">
					<Text
						style={{ color: '#587A90' }}
						className="px-[20px] text-center pb-[10px] weight-[400] text-[12px]"
					>
						Under Realm would like to connect with your Walless account to:
					</Text>
					<View className="mb-3 bg-[#2A4C63] rotate-[0.07deg] w-full h-[1px] mx-auto "></View>
					{rules?.map((item, index) => {
						return (
							<View
								key={`coneectionReqeust-${index}`}
								className="mb-[5px] flex flex-row gap-2 items-center"
							>
								<Image
									className="w-[14px] h-[14px]"
									source={{ uri: item.icon }}
								/>
								<Text className="weight-[400] text-[14px]">
									{item.description}
								</Text>
							</View>
						);
					})}
				</View>
			) : typeRequest == requestType.signatureRequest ? (
				<View className="mx-[23px] bg-[#01131F] rounded-[8px] border border-solid border-[#01131F] px-[19px] py-[10px] mb-[40px]">
					<Text
						style={{ color: '#587A90' }}
						className="px-[20px] text-center pb-[10px] weight-[400] text-[12px]"
					>
						Your signature has been requested
					</Text>
					{rules?.map((item, index) => {
						return (
							<View
								key={`signatureRequest-${index}`}
								className="mb-[5px] flex flex-row gap-2 items-center"
							>
								<Image
									className="w-[14px] h-[14px]"
									source={{ uri: item.icon }}
								/>
								<Text className="weight-[400] text-[14px]">
									{item.description}
								</Text>
							</View>
						);
					})}
				</View>
			) : (
				<></>
			)}
		</View>
	);
};
export default RequestBox;
