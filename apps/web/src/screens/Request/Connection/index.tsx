import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useParams } from 'react-router-dom';
import { Button, Hoverable, Text, View } from '@walless/gui';
import { AlertCircle, CheckCircle } from '@walless/icons';
import { PopupType } from '@walless/messaging';
import { handleRequestConnect } from 'bridge/listeners';
import { HeaderRequest } from 'components/HeaderRequest';
import LightText from 'components/LightText';
import { initializeKernelConnect } from 'utils/helper';
import { useRequestData } from 'utils/hooks';

import { logoSize, logoUri } from '../shared';

const RequestConnection = () => {
	const { requestId } = useParams();
	const { sender } = useRequestData(
		requestId as string,
		PopupType.REQUEST_CONNECT_POPUP,
	);

	const onApprovePress = () => {
		handleRequestConnect(requestId as string, true);
	};

	const onRejectPress = () => {
		handleRequestConnect(requestId as string, false);
	};

	useEffect(() => {
		initializeKernelConnect(PopupType.REQUEST_CONNECT_POPUP + '/' + requestId);
	}, []);

	return (
		<View style={styles.container}>
			<HeaderRequest />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Connection request</Text>
				<Image
					style={styles.titleImage}
					source={{ uri: sender.tab?.favIconUrl || logoUri }}
				/>
				<Text style={styles.senderName}>{sender.tab?.title || 'unknown'}</Text>
				<LightText fontSize={14}>{sender.tab?.url || 'unknown'}</LightText>
			</View>

			<View style={styles.contentContainer}>
				<View>
					<LightText fontSize={14} paddingHorizontal={25} textAlign="center">
						Under Realm would like to connect with your Walless account to:
					</LightText>

					<View horizontal>
						<CheckCircle size={18} color="#1FC17D" />
						<Text style={styles.activityText}>
							View your wallet balance & activity
						</Text>
					</View>

					<View horizontal>
						<CheckCircle size={18} color="#1FC17D" />
						<Text style={styles.activityText}>
							Send you request approval for transaction
						</Text>
					</View>
				</View>

				<View horizontal>
					<AlertCircle size={18} color="#566674" />
					<LightText fontSize={12} marginLeft={15}>
						This action does not make any fund transfer. This site cannot
						transfer fund without your permission.
					</LightText>
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<LightText fontSize={14} textAlign="center">
					Only connect to websites you trust!
				</LightText>
				<Button title="Connect" onPress={onApprovePress}></Button>
				<Hoverable onPress={onRejectPress}>
					<Text>Deny</Text>
				</Hoverable>
			</View>
		</View>
	);
};

export default RequestConnection;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#19232C',
	},
	titleContainer: {
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	},
	titleImage: {
		width: logoSize,
		height: logoSize,
		borderColor: '#566674',
		borderWidth: 2,
		borderRadius: 15,
		marginVertical: 10,
	},
	senderName: {
		fontSize: 18,
	},
	contentContainer: {
		backgroundColor: '#202D38',
		borderRadius: 15,
		marginVertical: 15,
		borderColor: 'rgba(86, 102, 116, .2)',
		borderWidth: 1,
	},
	activityText: {
		fontWeight: '300',
	},
	bottomContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 10,
	},
});
