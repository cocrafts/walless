import { FC, ReactNode } from 'react';
import { TouchableOpacity } from '@walless/ui';

interface Props {
	className?: string;
	children: ReactNode;
	onPress: () => void;
}

const LoginOption: FC<Props> = ({ className, children, onPress }) => {
	return (
		<TouchableOpacity
			className={`w-[50px] h-[50px] mx-2 p-1 rounded-xl bg-gradient-to-b from-color-4 to-color-3 border border-dark flex justify-center items-center ${className}`}
			onPress={onPress}
		>
			{children}
		</TouchableOpacity>
	);
};

export default LoginOption;
