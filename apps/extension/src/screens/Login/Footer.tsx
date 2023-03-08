import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text, View } from '@walless/ui';

interface Props {
	className?: string;
}

const Footer: FC<Props> = ({ className }) => {
	return (
		<View className={`flex items-center ${className}`}>
			<Text className="text-[8px] text-[#ADADAD]">
				Having issues with log in? Visit{' '}
				<Link className="text-[#ADADAD] underline" to="">
					Help page
				</Link>
			</Text>
			<Text className="text-[7px] text-[#ADADAD]">
				Powered by{' '}
				<a
					className="text-[#158CCE]"
					href="https://walless.io/"
					target="_blank"
					rel="noreferrer"
				>
					walless.io
				</a>
			</Text>
		</View>
	);
};

export default Footer;
