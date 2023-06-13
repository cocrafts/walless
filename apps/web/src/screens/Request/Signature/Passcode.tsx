import { type FC, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { PasscodeFeature } from '@walless/app';
import { Text, View } from '@walless/gui';
import { type ResponsePayload, ResponseCode } from '@walless/messaging';
import { resources } from 'utils/config';

interface Props {
	activeId: number;
	onPasscodeComplete: (passcode: string) => Promise<{
		responseCode?: ResponseCode;
		message?: string;
	}>;
}

export const RequestSignaturePasscode: FC<Props> = ({
	activeId,
	onPasscodeComplete,
}) => {
	const [error, setError] = useState('');
	const [passcode, setPasscode] = useState('');
	const [renderPasscode, setRenderPasscode] = useState(false);

	const onPasscodeChange = async (value: string, isCompleted?: boolean) => {
		setPasscode(value);
		if (error && value.length > 0) {
			setError('');
		}
		if (isCompleted) {
			const res: ResponsePayload = await onPasscodeComplete(value);

			if (res?.responseCode === ResponseCode.WRONG_PASSCODE) {
				setError('Wrong passcode');
				setPasscode('');
			} else if (res?.responseCode === ResponseCode.ERROR) {
				setError(res.message || '');
				setPasscode('');
			}
		}
	};

	useEffect(() => {
		if (activeId === 1) {
			setTimeout(() => setRenderPasscode(true), 200);
		} else setRenderPasscode(false);
	}, [activeId]);

	return (
		<View style={styles.container}>
			{/* <Header onBack={handleBack} /> */}

			<Image style={styles.icon} source={resources.walless.icon} />
			<View style={styles.titleBlock}>
				<Text style={styles.title}>Confirm your passcode</Text>
				<Text style={styles.description}>
					{
						"Secure your passcode! It's essential for accessing your account and authorizing transfers."
					}
				</Text>
			</View>
			{renderPasscode && (
				<PasscodeFeature
					passcode={passcode}
					error={error}
					onPasscodeChange={onPasscodeChange}
				/>
			)}
		</View>
	);
};

export default RequestSignaturePasscode;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		gap: 40,
	},
	icon: {
		width: 120,
		height: 60,
	},
	titleBlock: {
		alignItems: 'center',
		gap: 10,
	},
	title: {
		fontSize: 20,
	},
	description: {
		fontSize: 14,
		lineHeight: 18,
		color: '#566674',
		textAlign: 'center',
	},
});
