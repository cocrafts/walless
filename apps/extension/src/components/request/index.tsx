import { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from '@walless/ui';
import { LinearGradient } from 'expo-linear-gradient';

import RequestBox from './RequestBox';

interface RequestProps {
	type: string;
	rules?: RuleProps[];
	buttonPrimaryContent: string;
}
export interface RuleProps {
	icon: string;
	description: string;
}

const Request: FC<RequestProps> = ({ type, rules, buttonPrimaryContent }) => {
	return (
		<View className="w-screen h-screen">
			<View className="r h-[42px] relative">
				<Image
					className="w-[42px] h-[20px] absolute z-10 left-[14px] top-[11px]"
					source={{ uri: '/favicon.png' }}
				/>
				<View className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center flex-row gap-2">
					<Text className="font-normal text-[10px] text-[#ffffff]">
						Zbz thich...
					</Text>
					<Image
						className="w-[6px] h-[3px]"
						source={{ uri: '/img/request-screen/open_rectangle.png' }}
					/>
				</View>
			</View>
			<View className="bg-[#2A4C63] rotate-[0.07deg] w-[95%] h-[1px] mx-auto"></View>
			<View>
				<Text className="py-4 mx-auto font-normal weight-[500px] text-[20px]">
					{type}
				</Text>
				<Image
					source={{ uri: '/img/request-screen/app_logo.png' }}
					className="mx-auto w-[5rem] h-[5rem] rounded-[10px] pb-2.5"
				/>
				<View className="pb-3">
					<Text className="mx-auto font-normal weight-[500] text-[18px]">
						Under Realm
					</Text>
					<Text
						style={{ color: '#587A90' }}
						className="mx-auto pt-1 weight-[400] text-[#587A90] text-[10px]"
					>
						underrealm.stormgate.io
					</Text>
				</View>

				<RequestBox rules={rules} typeRequest={type} />
				<Text
					style={{ color: '#587A90' }}
					className="mx-auto mb-2.5 weight-[400px] text-[12px]"
				>
					Only connect to websites you trust!
				</Text>
				<View className="bg-[#88c3bf1a] flex flex-row px-3 py-3  items-center gap-2 mb-[13px] w-[85%] mx-auto">
					<Image
						className="w-[18px] h-[18px]"
						source={{ uri: '/img/request-screen/exclamation_image.png' }}
					/>
					<Text
						style={{ color: '#587A90' }}
						className="weight-[400px] text-[10px]"
					>
						This action does not make any fund transfer. This site cannot
						transfer fund without your permission
					</Text>
				</View>
				<LinearGradient
					colors={['#8FC5BE', '#1BA0DA']}
					style={{
						flex: 1,
						width: '80%',
						margin: 'auto',
						minHeight: 40,
						borderRadius: 8,
						marginBottom: '10px',
					}}
				>
					<TouchableOpacity>
						<Text style={{ textAlign: 'center', lineHeight: 40 }}>
							{buttonPrimaryContent}
						</Text>
					</TouchableOpacity>
				</LinearGradient>
				<TouchableOpacity
					style={{
						width: '80%',
						minHeight: 15,
						margin: 'auto',
						borderRadius: 8,
						backgroundColor: 'black',
					}}
				>
					<Text
						style={{ textAlign: 'center', lineHeight: 15, color: '#88c3c0' }}
					>
						Deny
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Request;
