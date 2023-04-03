import { Stack, Text } from '@walless/wui';
import DashboardLayout from 'components/DashboardLayout';
import SearchBar from 'components/SearchBar';
import Head from 'next/head';

const Profile = () => {
	const handleSearch = (value: string) => {
		console.log(value);
	};

	return (
		<Stack minHeight="100vh">
			<Head>
				<title>Profile</title>
				<meta name="description" content="Choose a layout to start" />
			</Head>

			<DashboardLayout>
				<Stack
					display="flex"
					alignItems="center"
					gap={24}
					paddingHorizontal={14}
					paddingVertical={20}
				>
					<Text fontSize={20} lineHeight={26} fontWeight="500">
						Choose a layout to start
					</Text>

					<SearchBar
						placeholder="Explore exciting project"
						onSearch={handleSearch}
					/>
				</Stack>
			</DashboardLayout>
		</Stack>
	);
};

export default Profile;
