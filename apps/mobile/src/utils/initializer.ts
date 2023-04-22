import { initializeStorage } from './pouchdb';

export const initializeServices = async () => {
	await Promise.all([initializeStorage()]);
};
