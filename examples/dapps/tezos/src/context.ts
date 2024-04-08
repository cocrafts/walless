const context = {
	address: '',
};

export const updateContext = ({ address }: { address?: string }) => {
	if (address) {
		context.address = address;
	}
};
