import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Home, LogOut, User, Users } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
	const navigate = useNavigate();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			navigate("/");
			toast.success("Berhasil keluar");
		},
	});

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	return (
		<nav className='bg-secondary shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-3'>
					<div className='flex items-center space-x-4'>
						<Link to='/'>
							<img className='h-12 rounded' src='/logo-gunadarma.png' alt='LinkedIn' />
						</Link>
					</div>
					<div className='flex items-center gap-2 md:gap-6'>
						{authUser ? (
							<>
								<Link to={"/"} className='text-neutral flex flex-col items-center hover:text-[#763996] transition-base'>
									<Home size={20} />
									<span className='text-xs hidden md:block'>Beranda</span>
								</Link>
								<Link to='/network' className='text-neutral flex flex-col items-center relative hover:text-[#763996] transition-base'>
									<Users size={20} />
									<span className='text-xs hidden md:block'>Jejaring Saya</span>
									{unreadConnectionRequestsCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-primary text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>
								<Link to='/notifications' className='text-neutral flex flex-col items-center relative hover:text-[#763996] transition-base'>
									<Bell size={20} />
									<span className='text-xs hidden md:block'>Notifikasi</span>
									{unreadNotificationCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-primary text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className='text-neutral flex flex-col items-center hover:text-[#763996] transition-base'
								>
									<User size={20} />
									<span className='text-xs hidden md:block'>Saya</span>
								</Link>
								<button
									className='bg-neutral p-3 rounded-lg flex items-center space-x-1 text-sm hover:bg-[#B76CB7] text-white hover:bg-primary-dark transition-base'
									onClick={() => logout()}
								>
									<LogOut size={20} />
									<span className='hidden md:inline'>Keluar</span>
								</button>
							</>
						) : (
							<>
								<Link to='/signin' className='btn btn-ghost'>
									Masuk
								</Link>
								<Link to='/signup' className='btn btn-primary'>
									Aktivasi
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
