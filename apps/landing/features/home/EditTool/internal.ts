import { FC } from 'react';

export enum ProjectInfoComponent {
	name,
	description,
	banner,
	avatar,
}

export interface ProjectInfoState {
	name: string;
	description: string;
	banner: string;
	avatar: string;
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
	previewImage: string;
	components: FC<ToolboxComponentProps>[];
}
