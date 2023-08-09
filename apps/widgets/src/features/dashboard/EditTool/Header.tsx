import { Text } from '@walless/gui';

const Header = () => {
	return (
		<Text
			style={{
				alignSelf: 'center',
				fontSize: 30,
				maxWidth: 600,
				textAlign: 'center',
			}}
		>
			Having <Text style={{ color: '#0694D3' }}>your own custom layout</Text> in
			Walless has never been easier. Try it now!
		</Text>
	);
};

export default Header;
