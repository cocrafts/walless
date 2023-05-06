import auth from '@react-native-firebase/auth';

export const signInWithGoogle = async () => {
	const profile = await auth().signInAnonymously();
	console.log('login with Google.. on progress!', profile);
};
