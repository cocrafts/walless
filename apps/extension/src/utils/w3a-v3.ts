import { BNString } from '@tkey/common-types';

/**
 * This method return temporary share from anywhere
 * If temporary share was expired, release it and return null
 * */
export const getTemporaryShare = () => {
    return null;
};

/**
 * This method return private key if it exits a share in storage
 * add temporaryShare is valid
 * */
export const getKeyFromStart = (temporaryShare: BNString) => {
    // If storage was found and temporary share is valid
    // todo: reconstruct private key and return it
    // If storage was found and temporary share was expired
    // todo: require passcode from user
    console.log(temporaryShare);
    return null;
};

/**
 * This method return private key if it exits a share in storage
 * and passcode parameter is valid
 * */
export const getKeyByPasscode = (passcode: string) => {
    console.log(passcode);
    return null;
};

/**
 * This method return use to trigger login
 * */
export const triggerGoogleLogin = () => {
    return null;
};

/**
 * This method return private key.
 * Just call it after trigger login
 * */
export const initAfterLogin = () => {
    // If this is the first time login
    // If storage share was found
    // If storage share wasn't found (loss or in new browser/ device)
};