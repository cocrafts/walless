import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-dom';
import { Anchor, Button, Text } from '@walless/gui';
import { AlertCircle } from '@walless/icons';
import { PopupType } from '@walless/messaging';
import { handleRequestInstallLayout } from 'bridge/listeners';
import { HeaderRequest } from 'components/HeaderRequest';
import LightText from 'components/LightText';
import { initializeKernelConnect } from 'utils/helper';
import { useRequestData } from 'utils/hooks';

import { logoSize, logoUri } from './shared';

export const RequestLayout = () => {
	const { requestId } = useParams();
	const { sender } = useRequestData(
		requestId as string,
		PopupType.REQUEST_INSTALL_LAYOUT_POPUP,
	);
	const senderTitle = sender.tab?.title || 'Unknown';

	const onApprovePress = () => {
		handleRequestInstallLayout(requestId as string, true);
	};

	const onNeverAskAgainPress = () => {
		handleRequestInstallLayout(requestId as string, false);
	};

	const onAskMeLaterPress = () => {
		handleRequestInstallLayout(requestId as string, false);
	};

	useEffect(() => {
		initializeKernelConnect(
			PopupType.REQUEST_INSTALL_LAYOUT_POPUP + '/' + requestId,
		);
	}, []);

	return (
		<View style={styles.container}>
			<HeaderRequest />
			<View style={styles.innerContainer}>
				<View style={styles.headingContainer}>
					<Text style={styles.headingText}>Layout request</Text>
					<Image
						style={styles.headingImg}
						source={sender.tab?.favIconUrl || logoUri}
					/>
					<Text style={styles.titleText}>{sender.tab?.title || 'Unknown'}</Text>
					<LightText fontSize={14}>{sender.tab?.url || 'Unknown'}</LightText>
				</View>

				<View style={styles.questionContainer}>
					<Text style={styles.questionText}>
						{`${senderTitle} would like to add its custom layout appearance to your Walless account.`}
					</Text>

					<Anchor href="_" style={styles.anchorText}>
						Learn more
					</Anchor>
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.explainContainer}>
						<AlertCircle size={18} color="#566674" />
						<Text style={styles.explainText}>
							This action does not make any fund transfer. This site cannot
							transfer fund without your permission.
						</Text>
					</View>

					<View style={styles.trustContainer}>
						<Text style={styles.trustText}>
							Only connect to websites you trust!
						</Text>
						<Button style={styles.acceptButton} onPress={onApprovePress}>
							<Text>Accept</Text>
						</Button>
						<View style={styles.commandContainer}>
							<Button
								style={styles.outlineButton}
								onPress={onNeverAskAgainPress}
							>
								<Text>Never Ask Again</Text>
							</Button>
							<Button style={styles.outlineButton} onPress={onAskMeLaterPress}>
								<Text>Ask me later</Text>
							</Button>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default RequestLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#19232C',
	},
	innerContainer: {
		flex: 1,
		padding: 20,
		alignItems: 'stretch',
	},
	headingContainer: {
		alignItems: 'center',
	},
	headingText: {
		fontSize: 20,
	},
	headingImg: {
		borderWidth: 2,
		borderRadius: 15,
		marginVertical: 10,
		borderColor: '#566674',
		width: logoSize,
		height: logoSize,
	},
	titleText: {
		fontSize: 18,
	},
	questionContainer: {
		paddingTop: 30,
		alignItems: 'center',
	},
	questionText: {
		textAlign: 'center',
		fontWeight: '300',
		fontSize: 14,
	},
	anchorText: {
		marginTop: 15,
		fontSize: 14,
		textDecorationLine: 'none',
		color: '#0694D3',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	explainContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		borderRadius: 15,
		marginBottom: 20,
		borderColor: 'rgba(86, 102, 116, .2)',
		borderWidth: 1,
		backgroundColor: '#202D38',
	},
	explainText: {
		fontSize: 12,
		marginLeft: 15,
	},
	trustContainer: {
		paddingHorizontal: 10,
	},
	trustText: {
		textAlign: 'center',
	},
	acceptButton: {
		marginVertical: 10,
	},
	commandContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	outlineButton: {
		backgroundColor: 'transparent',
		padding: 0,
	},
});
