import { proxy } from 'valtio';

export interface UniversalState {
	isDrawerOpen: boolean;
}

export const universalSate = proxy<UniversalState>({
	isDrawerOpen: false,
});

export const toggleDrawer = (flag?: boolean) => {
	if (flag === undefined) {
		universalSate.isDrawerOpen = !universalSate.isDrawerOpen;
	} else {
		universalSate.isDrawerOpen = flag;
	}
};
