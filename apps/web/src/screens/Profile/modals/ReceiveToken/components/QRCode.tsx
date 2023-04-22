import { FC } from 'react';
import { Stack } from '@walless/ui';
import { QRCodeCanvas } from 'qrcode.react';

interface Props {
	value: string;
}

const QRCode: FC<Props> = ({ value }) => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			width={194}
			height={194}
			backgroundColor="#FFFFFF"
			borderRadius={8}
		>
			<QRCodeCanvas value={value} size={168} />
		</Stack>
	);
};

export default QRCode;
