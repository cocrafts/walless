import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { AptosAbstractProfile } from '@walless/app/';
import { aptosHackathonActions, aptosHackathonState } from '@walless/app/';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

export const Dashboard = () => {
	const { message, aliceProfile, bobProfile, wallessPoolProfile } =
		useSnapshot(aptosHackathonState);

	useEffect(() => {
		aptosHackathonActions.initDemo();
	}, []);

	const getMessageStyleByStatus = (status: string) => {
		switch (status) {
			case 'success':
				return styles.messageSuccess;
			case 'error':
				return styles.messageError;
			default:
				return {};
		}
	};

	return (
		<View style={styles.sliderContainer}>
			{message.status !== 'none' && (
				<Text style={getMessageStyleByStatus(message.status)}>
					{message.status} : {message.text}
				</Text>
			)}
			<AccountInfo {...aliceProfile} />
			<AccountInfo {...bobProfile} />
			<AccountInfo {...wallessPoolProfile} />
		</View>
	);
};

export default Dashboard;

const AccountInfo: FC<AptosAbstractProfile> = ({
	name,
	address,
	octas,
	token,
}) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoNameText}>{name}</Text>
		<Text>{address}</Text>
		<Text>Octas: {octas.toString()}</Text>
		<Text>Token: {token}</Text>
	</View>
);

const styles = StyleSheet.create({
	sliderContainer: {
		padding: 10,
		gap: 10,
	},
	messageSuccess: {
		color: 'green',
	},
	messageError: {
		color: 'red',
	},
	infoContainer: {
		padding: 10,
		gap: 10,
		borderWidth: 1,
		borderColor: '#19A3E1',
		borderRadius: 10,
	},
	infoNameText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
