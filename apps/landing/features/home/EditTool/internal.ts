import { FC } from 'react';

export const handleChangeImage = (
	event: React.ChangeEvent<HTMLInputElement>,
	callback: (url: string) => void,
) => {
	if (!event.target.files?.length) return;

	const reader = new FileReader();
	reader.onload = (e) => callback(e.target?.result as string);
	reader.readAsDataURL((event.target.files as FileList)[0]);
};

export enum ProjectInfoComponent {
	name,
	description,
	banner,
	avatar,
}

export enum TokenInfoComponent {}

export type Target = ProjectInfoComponent | TokenInfoComponent | null;

export interface PreviewProps {
	target: Target;
}

export interface ToolboxProps {
	tools: ToolboxItem[];
	activeTool: ToolboxItem;
	setActiveTool: (tool: ToolboxItem) => void;
	setTarget: (target: Target) => void;
}

export interface ToolboxComponentProps {
	setTarget: (target: Target) => void;
}

export interface ToolboxItem {
	name: string;
	preview: FC<PreviewProps>;
	components: FC<ToolboxComponentProps>[];
}
