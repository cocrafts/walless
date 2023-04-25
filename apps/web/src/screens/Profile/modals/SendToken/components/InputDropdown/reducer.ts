import { DropdownItemProps } from '../../internal';

export type State = {
	items: DropdownItemProps[];
	filteredItems: DropdownItemProps[];
	currentItem: DropdownItemProps | null;
	isDropdownOpen: boolean;
	query: string;
};

export enum ActionType {
	SELECT_ITEM = 'SELECT_ITEM',
	QUERY = 'CHANGE_INPUT',
}

export type Action = {
	type: ActionType;
	payload: unknown;
};

const filter = (items: DropdownItemProps[], query: string) => {
	return items.filter((item) =>
		item.name?.toLowerCase().includes(query.toLowerCase()),
	);
};

const moveSelectedItemToTop = (
	items: DropdownItemProps[],
	selectedItem: DropdownItemProps,
) => {
	const filteredItems = items.filter((item) => item.name !== selectedItem.name);
	return [selectedItem, ...filteredItems];
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.SELECT_ITEM:
			return {
				...state,
				currentItem: action.payload as DropdownItemProps,
				isDropdownOpen: false,
				query: (action.payload as DropdownItemProps).name || '',
				filteredItems: moveSelectedItemToTop(
					state.items,
					action.payload as DropdownItemProps,
				),
			};
		case ActionType.QUERY:
			return {
				...state,
				query: action.payload as string,
				isDropdownOpen: true,
				filteredItems: filter(state.items, action.payload as string),
			};
		default:
			return state;
	}
};
