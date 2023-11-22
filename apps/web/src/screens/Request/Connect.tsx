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

import { logoSize, logoUri } from './shared';

const RequestConnect = () => {
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

	const title = sender.tab?.title || 'Unknown';

	return (
		<View style={styles.container}>
			<HeaderRequest />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Connection request</Text>
				<Image
					style={styles.titleImage}
					source={{ uri: sender.tab?.favIconUrl || logoUri }}
				/>
				<Text style={styles.senderName}>{title}</Text>
				<LightText fontSize={14}>{sender.tab?.url || 'unknown'}</LightText>
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.mainContentContainer}>
					<LightText fontSize={14} lineHeight={20} textAlign="center">
						{title} would like to connect with your Walless account to:
					</LightText>

					<View style={styles.activityContainer} horizontal>
						<CheckCircle size={18} color="#1FC17D" />
						<Text style={styles.activityText}>
							View your wallet balance & activity
						</Text>
					</View>

					<View style={styles.activityContainer} horizontal>
						<CheckCircle size={18} color="#1FC17D" />
						<Text style={styles.activityText}>
							Send you request approval for transaction
						</Text>
					</View>
				</View>

				<View style={styles.noteContainer} horizontal>
					<AlertCircle size={30} color="#566674" />
					<LightText fontSize={12} marginLeft={15} lineHeight={18}>
						This action does not make any fund transfer. This site cannot
						transfer fund without your permission.
					</LightText>
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<LightText textAlign="center" marginBottom={12}>
					Only connect to websites you trust!
				</LightText>
				<Button title="Connect" onPress={onApprovePress}></Button>
				<Hoverable style={styles.deniedButton} onPress={onRejectPress}>
					<Text>Deny</Text>
				</Hoverable>
			</View>
		</View>
	);
};

export default RequestConnect;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#19232C',
	},
	titleContainer: {
		marginTop: 20,
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
		marginHorizontal: 20,
	},
	mainContentContainer: {
		gap: 8,
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(86, 102, 116, .2)',
	},
	activityContainer: {
		gap: 10,
		alignItems: 'center',
	},
	activityText: {
		fontWeight: '300',
	},
	noteContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		alignItems: 'center',
	},
	bottomContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 18,
		marginBottom: 8,
	},
	deniedButton: {
		padding: 14,
		alignSelf: 'center',
	},
});
