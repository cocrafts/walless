export const pThrottle = () => {
	return (func_) =>
		(...args) => {
			return func_.apply(this, args);
		};
};

export default pThrottle;
