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
	payload?: unknown;
};

const filter = (items: DropdownItemProps[], query: string) => {
	return items.filter((item) =>
		item.name?.toLowerCase().includes(query.toLowerCase()),
	);
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.SELECT_ITEM:
			return {
				...state,
				currentItem: action.payload as DropdownItemProps,
				query: (action.payload as DropdownItemProps).name,
				isDropdownOpen: false,
				filteredItems: filter(
					state.items,
					(action.payload as DropdownItemProps).name,
				),
			};
		case ActionType.QUERY:
			return {
				...state,
				currentItem: null,
				query: action.payload as string,
				isDropdownOpen: true,
				filteredItems: filter(state.items, action.payload as string),
			};
		default:
			return state;
	}
};
