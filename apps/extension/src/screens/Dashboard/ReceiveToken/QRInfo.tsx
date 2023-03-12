import QRCode from 'react-native-qrcode-svg';
import { Text, View } from '@walless/ui';
const QRInfo = () => {
	return (
		<View>
			<View className="pt-3 w-52 h-52 mx-auto flex items-center justify-items-center rounded-lg mb-3 bg-[#ffffff]">
				<QRCode
					// logoSize=
					size={180}
					value="https://walless.io/"
					logoSize={30}
					logoBackgroundColor="transparent"
				/>
			</View>
			<Text className="font-normal text-[10px] mx-auto mb-6 [color:#587a90]">
				Tap to save as image
			</Text>
		</View>
	);
};

export default QRInfo;
