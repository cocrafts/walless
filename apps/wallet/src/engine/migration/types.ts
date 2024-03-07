export type Migration = {
	name: string;
	description?: string;
	version: string;
	migrate: () => Promise<void>;
};
