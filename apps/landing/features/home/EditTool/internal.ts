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
	logo: string;
	banner: string;
}

export enum DetailInfoComponent {}

export type Target = ProjectInfoComponent | DetailInfoComponent | null;

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
