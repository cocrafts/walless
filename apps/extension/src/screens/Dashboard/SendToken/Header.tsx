import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowTopRightIcon, Text, TimesIcon, View } from '@walless/ui';

interface Props {
	className?: string;
	title: string;
	returnLink: string;
}

const Header: FC<Props> = ({ className, title, returnLink }) => {
	return (
		<View className={`w-full flex flex-row justify-between ${className}`}>
			<View className="flex flex-row justify-start gap-1">
				<ArrowTopRightIcon size={16} color="#29A4D6" />
				<Text className="text-xl">{title}</Text>
			</View>

			<Link to={returnLink}>
				<TimesIcon size={24} color="white" />
			</Link>
		</View>
	);
};

export default Header;
