import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { modalActions, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

const InvitationError = () => {
	const handleExit = () => {
		console.log('destroying modal');
		modalActions.destroy('invitation-error');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.exitButton} onPress={handleExit}>
				<Times size={16} />
			</TouchableOpacity>
			<Text>Invitation code is invalid</Text>
		</View>
	);
};

export default InvitationError;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 400,
		height: 60,
		backgroundColor: '#AE3939',
	},
	exitButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: 'blue',
	},
});
