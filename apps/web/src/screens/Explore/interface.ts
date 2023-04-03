export interface SearchBarProps {
	placeholder?: string;
	onSearch?: (value: string) => void;
}

export interface LayoutCardProps {
	id: string;
	name: string;
	description: string;
	thumbnail: string;
	logo: string;
	loveCount: number;
	activeUsers: number;
}
