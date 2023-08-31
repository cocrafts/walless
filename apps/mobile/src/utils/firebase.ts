import auth from '@react-native-firebase/auth';

export interface FireCache {
	idToken?: string;
}

export const fireCache: FireCache = {
	idToken: undefined,
};

auth().onIdTokenChanged(async (user) => {
	if (user) {
		fireCache.idToken = await user.getIdToken();
	} else {
		fireCache.idToken = undefined;
	}
});

export const initializeAuth = async () => {
	if (auth().currentUser) {
		fireCache.idToken = await auth().currentUser?.getIdToken();
	}
};
