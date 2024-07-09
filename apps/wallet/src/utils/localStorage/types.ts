type GetItem = <T>(key: string) => Promise<T | null>;

type SetItem = <T>(key: string, value: T) => Promise<void>;

type RemoveItem = (key: string) => Promise<void>;

type Clear = () => Promise<void>;

export interface UniversalLocalStorage {
	getItem: GetItem;
	setItem: SetItem;
	removeItem: RemoveItem;
	clear: Clear;
}
