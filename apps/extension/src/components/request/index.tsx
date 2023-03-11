import { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from '@walless/ui';
import { LinearGradient as LinearGradientComponent } from 'components/linearGradient';
import { requestType } from 'utils/config';

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
		<LinearGradientComponent
			colors={['#011726', '#003356']}
			start={{ x: 1, y: 1 }}
			end={{ x: 0.9, y: 0 }}
		>
			<View className="w-screen" style={{ height: ' calc(100% - 30px)' }}>
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
				<View style={{ height: ' calc(100% - 42px)' }}>
					<Text className="py-4 mx-auto font-normal font-[400] text-[20px]">
						{type}
					</Text>
					<Image
						source={{ uri: '/img/request-screen/app_logo.png' }}
						className="mx-auto w-[5rem] h-[5rem] rounded-[10px] pb-2.5"
					/>
					<View className="pb-3">
						<Text className="mx-auto font-normal font-[400] text-[18px]">
							Under Realm
						</Text>
						<Text
							style={{ color: '#587A90' }}
							className="mx-auto font-[300] text-[#587A90] text-[10px]"
						>
							underrealm.stormgate.io
						</Text>
					</View>

					<RequestBox rules={rules} typeRequest={type} />
					<View className="mt-auto">
						<Text
							style={{ color: '#587A90' }}
							className="mx-auto mb-2.5 font-[300] text-[12px]"
						>
							Only connect to websites you trust!
						</Text>
						{type !== requestType.signatureRequest && (
							<View className="bg-[#88c3bf1a] flex flex-row px-[10px] py-[10px] items-center gap-2 mb-[13px] w-[80%] mx-auto rounded-[10px]">
								<Image
									className="w-[18px] h-[18px]"
									source={{ uri: '/img/request-screen/exclamation_image.png' }}
								/>
								<Text
									style={{ color: '#587A90' }}
									className="font-[400] text-[10px] rounded-[10px]"
								>
									This action does not make any fund transfer. This site cannot
									transfer fund without your permission
								</Text>
							</View>
						)}
						<LinearGradientComponent
							locations={[0.4, 0.8]}
							colors={['#1a9fd9', '#7bbec2']}
							style={{
								flex: 1,
								width: '80%',
								margin: 'auto',
								minHeight: 40,
								borderRadius: 8,
								marginBottom: '10px',
							}}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<TouchableOpacity>
								<Text style={{ textAlign: 'center', lineHeight: 40 }}>
									{buttonPrimaryContent}
								</Text>
							</TouchableOpacity>
						</LinearGradientComponent>

						{type !== requestType.layoutRequest ? (
							<Text
								style={{
									textAlign: 'center',
									lineHeight: 15,
									color: '#88c3c0',
								}}
								className="mx-auto text-[12px] font-[300]"
							>
								Deny
							</Text>
						) : (
							<View className="mx-auto w-[80%] flex flex-row justify-between items-center">
								<Text
									className="text-[12px] font-[300]"
									style={{ color: '#595E61' }}
								>
									Never ask again
								</Text>
								<Text
									className="text-[12px] font-[300]"
									style={{ color: '#88c3c0' }}
								>
									Ask me later
								</Text>
							</View>
						)}
					</View>
				</View>
			</View>
		</LinearGradientComponent>
	);
};

export default Request;
