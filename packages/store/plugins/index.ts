import { clearAllDocs } from './clear';
import { removeDoc } from './delete';
import { safeGet } from './get';
import { upsert } from './upsert';

export * from './type';

export default {
	upsert,
	safeGet,
	removeDoc,
	clearAllDocs,
};
