import { useState } from 'react';
import { Button, Input, Stack, Text } from '@walless/ui';
import Link from 'next/link';

const CountMeIn = () => {
	const [email, setEmail] = useState('');
	const [registered, setRegistered] = useState(false);

	const isValidEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handleRegister = () => {
		setRegistered(isValidEmail(email));
	};

	return (
		<Stack gap={28}>
			<Text fontWeight="600" fontSize={28} textAlign="center">
				We don&apos;t want you miss latest{' '}
				<Link href="/">
					<Text color="#0694D3">updates</Text>
				</Link>
				!
			</Text>

			{registered ? (
				<Text maxWidth={420} color="#566674" textAlign="right">
					Thanks for signing up. We&apos;ll keep you posted with Walless latest
					updates and exclusive perks.
				</Text>
			) : (
				<Stack
					paddingVertical={8}
					paddingHorizontal={4}
					borderWidth={1}
					borderRadius={16}
					borderColor="#566674"
					flexDirection="row"
					$gtMd={{
						marginLeft: 24,
					}}
				>
					<Input
						backgroundColor="transparent"
						flexGrow={1}
						placeholder="Enter your email"
						borderWidth={0}
						onChangeText={(email) => setEmail(email)}
					/>
					<Button
						backgroundColor={isValidEmail(email) ? '#0694D3' : '#566674'}
						borderRadius={12}
						paddingHorizontal={36}
						onPress={handleRegister}
					>
						<Text fontWeight="600">Count me in</Text>
					</Button>
				</Stack>
			)}
		</Stack>
	);
};

export default CountMeIn;
