import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
	theme: {
		extend: {
			fontFamily: {
				syne: ['Syne', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				linkedin: {
					primary: "#B76CB7", // LinkedIn Blue
					secondary: "#FFFFFF", // White
					accent: "#7FC15E", // LinkedIn Green (for accents)
					neutral: "#000000", // Black (for text)
					"base-100": "#F3F2EF", // Light Gray (background)
					info: "#5E5E5E", // Dark Gray (for secondary text)
					success: "#057642", // Dark Green (for success messages)
					warning: "#F5C75D", // Yellow (for warnings)
					error: "#CC1016", // Red (for errors)
				},
			},
		],
	},
};
