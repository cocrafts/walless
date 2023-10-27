import type { WidgetDocument } from '@walless/store';

export interface LayoutCardProps {
	item: WidgetDocument;
	isAdded: boolean;
	onAddPress?: (item: WidgetDocument) => void;
	onRemovePress?: (item: WidgetDocument) => void;
	onLovePress?: (item: WidgetDocument) => void;
}
