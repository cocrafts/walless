import { FC } from 'react';
import { Button, Text, TimesIcon, View } from '@walless/ui';

interface SetupPasscodeProps {
	className?: string;
}

const SetupPasscode: FC<SetupPasscodeProps> = ({ className }) => {
	return (
		<View
			className={`bg-[#0C3B5A] px-2 py-4 ${className}`}
			onTouchEnd={() => {
				console.log('close');
			}}
		>
			<View>
				<TimesIcon
					size={20}
					color={'white'}
					className="absolute -top-1 right-0"
				/>
			</View>

			<Text className="text-color-7 font-bold my-2">
				Setup your passcode/password
			</Text>
			<Text className="text-color-7 mt-2 mb-3">
				Enhance your security is important because......
			</Text>
			<Button
				title="Setup Now"
				className="bg-color-2 w-fit px-2 py-1"
				titleClass="text-xs"
			/>
		</View>
	);
};

export default SetupPasscode;
