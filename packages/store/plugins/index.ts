import { docRemove } from './delete';
import { safeGet } from './get';
import { upsert } from './upsert';

export * from './type';

export default {
	upsert,
	safeGet,
	docRemove,
};
