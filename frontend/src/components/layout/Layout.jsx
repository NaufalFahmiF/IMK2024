import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className='min-h-screen bg-gradient-to-t from-purple-500 via-pink-300 to-amber-100'>
			<Navbar />
			<main className='max-w-7xl mx-auto px-4 py-6'>
				<Outlet />
			</main>
		</div>
	);
};
export default Layout;
