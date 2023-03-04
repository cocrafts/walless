import { Link } from 'react-router-dom';
import { Text } from '@walless/ui';

const ExploreLink = () => {
	return (
		<Text className="h-full relative text-center text-xs">
			<Text className="w-full absolute top-1/2 left-1/2 mt-[-50px] -translate-x-1/2 -translate-y-1/2 text-[#587A90]">
				Let&apos;s get this excited and explore{' '}
				<Link className="text-[#587A90]" to="#/profile">
					here
				</Link>
			</Text>
		</Text>
	);
};

export default ExploreLink;
