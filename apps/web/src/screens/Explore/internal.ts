import type { ExtensionDocument } from '@walless/store';

export interface LayoutCardProps {
	item: ExtensionDocument;
	isAdded: boolean;
	onAddPress?: (item: ExtensionDocument) => void;
	onRemovePress?: (item: ExtensionDocument) => void;
	onLovePress?: (item: ExtensionDocument) => void;
}
