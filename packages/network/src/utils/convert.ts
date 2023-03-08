export const convertStringToUin8Array = (privateKey: string) => {
	return new Uint8Array(
		privateKey.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
	);
};
