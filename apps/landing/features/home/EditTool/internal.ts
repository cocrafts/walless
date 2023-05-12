import { FC } from 'react';
import { Networks } from '@walless/core';
import { MetadataDocument } from '@walless/store';

export interface ToolboxProps {
	tools: ToolboxItem[];
	activeTool: ToolboxItem;
	setActiveTool: (tool: ToolboxItem) => void;
}

export interface ToolboxItem {
	name: string;
	preview: FC;
	previewImage: string;
	components: FC[];
}

export enum ProjectTool {
	name,
	description,
	logo,
	banner,
}

export interface ProjectState {
	name: string;
	description: string;
	logo: string;
	banner: string;
}

export enum DetailTool {
	networks,
	token,
	collectibles,
	icon,
}

export interface DetailState {
	networks: Networks[];
	tokens: Record<string, MetadataDocument>;
	collectibles: Record<string, MetadataDocument>;
	icon: string;
}

export type Target = ProjectTool | DetailTool | null;
