import { FC, ReactNode } from 'react';
import { View } from '@walless/ui';

export interface InfoDisplayProps {
	heading1?: ReactNode;
	heading2?: ReactNode;
	content?: ReactNode;
}

interface InfoTableProps {
	className?: string;
	data: InfoDisplayProps[];
}

const InfoTable: FC<InfoTableProps> = ({ className, data }) => {
	return (
		<View
			className={`border border-[#203C4E] rounded-lg px-4 flex gap-2 justify-center divide-y divide-[#203C4E] ${className}`}
		>
			{data.map((item, index) => (
				<View key={index} className="flex justify-between items-center py-2">
					<View className="text-[#1B415A] font-bold">{item.heading1}</View>
					<View className="text-[#1B415A] font-bold">{item.heading2}</View>
					<View className="text-[#1B415A] font-bold">{item.content}</View>
				</View>
			))}
		</View>
	);
};

export default InfoTable;
