import { FC } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Stack } from '@walless/ui';

interface Props {
	value: string;
}

const QRCodeSVG: FC<Props> = ({ value }) => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			width={194}
			height={194}
			backgroundColor="#FFFFFF"
			borderRadius={8}
		>
			<QRCode value={value} size={168} />
		</Stack>
	);
};

export default QRCodeSVG;
