module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins'],
		},
		extend: {
			colors: {
				transparent: 'transparent',
				white: '#ffffff',
				'light-gray': '#99b0bf',
				gray: '#dedede',
				light: '#3B6887',
				dark: '#0c3856',
				color: {
					1: '#8ac1bf',
					2: '#1ba0da',
					3: '#0a4669',
					4: '#06263c',
					5: '#00233b',
					6: '#011726',
					7: '#00080e',
				},
				'coal-start': '#212121',
				'coal-end': '#4c4c4c',
			},
		},
	},
	plugins: [],
	safelist: ['font-poppins', 'text-black', 'text-white', 'text-[#1FA1D9]'],
};
