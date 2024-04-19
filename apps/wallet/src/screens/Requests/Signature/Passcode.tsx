import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ResponseCode } from '@walless/core';
import { Passcode, Text, View } from '@walless/gui';
import type { ResponsePayload } from '@walless/messaging';
import assets from 'utils/assets';

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
	const [loading, setLoading] = useState(false);

	const onPasscodeChange = async (value: string, isCompleted?: boolean) => {
		setPasscode(value);
		if (error && value.length > 0) {
			setError('');
		}
		if (isCompleted) {
			setLoading(true);
			const res: ResponsePayload = await onPasscodeComplete(value);

			if (res?.responseCode === ResponseCode.WRONG_PASSCODE) {
				setError('Wrong passcode');
				setPasscode('');
			} else if (res?.responseCode === ResponseCode.ERROR) {
				setError(res.message || '');
				setPasscode('');
			} else if (res.responseCode === ResponseCode.SUCCESS) {
				window.close();
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		if (activeId === 1) {
			setTimeout(() => setRenderPasscode(true), 200);
		} else setRenderPasscode(false);
	}, [activeId]);

	return (
		<View style={styles.container}>
			<Image style={styles.icon} source={assets.misc.walless} />
			<View style={styles.titleBlock}>
				<Text style={styles.title}>Confirm your passcode</Text>
				<Text style={styles.description}>
					{
						"Secure your passcode! It's essential for accessing your account and authorizing transfers."
					}
				</Text>
			</View>
			{renderPasscode && (
				<Passcode
					passcode={passcode}
					error={error}
					onPasscodeChange={onPasscodeChange}
					loading={loading}
				/>
			)}
		</View>
	);
};

export default RequestSignaturePasscode;

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
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
