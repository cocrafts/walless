import { isValidSuiAddress } from '@mysten/sui.js';
import { PublicKey as SolanaPublicKey } from '@solana/web3.js';
import { validateAddress, ValidationResult } from '@taquito/utils';
import { TxnBuilderTypes } from 'aptos';

import { Networks } from './commonTypes';

export const getNetworksByAddress = (address: string): Networks[] => {
	const networks: Networks[] = [];

	if (validateSolanaAddress(address)) {
		networks.push(Networks.solana);
	}

	if (validateSuiAddress(address)) {
		networks.push(Networks.sui);
	}

	if (validateTezosAddress(address)) {
		networks.push(Networks.tezos);
	}

	if (validateAptosAddress(address)) {
		networks.push(Networks.aptos);
	}

	return networks;
};

const validateSolanaAddress = (address: string) => {
	//Ref: https://stackoverflow.com/questions/71200948/how-can-i-validate-a-solana-wallet-address-with-web3js
	try {
		const pubkey = new SolanaPublicKey(address);
		const isSolanaAddress = SolanaPublicKey.isOnCurve(pubkey.toBuffer());
		return isSolanaAddress;
	} catch {
		return false;
	}
};

const validateSuiAddress = (address: string) => {
	//Ref: https://docs.sui.io/guides/developer/getting-started/get-address
	//Ref: https://sdk.mystenlabs.com/typescript/utils#formatters
	return isValidSuiAddress(address);
};

const validateTezosAddress = (address: string) => {
	//Ref: https://tezostaquito.io/docs/validators/
	return validateAddress(address) === ValidationResult.VALID;
};

const validateAptosAddress = (address: string) => {
	//Ref: https://aptos-labs.github.io/ts-sdk-doc/classes/TxnBuilderTypes.AccountAddress.html#isValid
	const { AccountAddress } = TxnBuilderTypes;
	return AccountAddress.isValid(address);
};
