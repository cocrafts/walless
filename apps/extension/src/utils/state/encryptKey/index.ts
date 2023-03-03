import { proxy } from 'valtio';

interface EncryptKey {
	passcode: string;
	password: string;
}

export const encryptKey = proxy<EncryptKey>({
	passcode: '',
	password: '',
});

export const encryptKeyActions = {
	inputPasscode: (text: string) => {
		encryptKey.passcode = encryptKey.passcode + text;
	},
	deletePasscode: (index: number) => {
		encryptKey.passcode = encryptKey.passcode.slice(0, index);
	},
};
