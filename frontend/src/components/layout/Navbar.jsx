import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import UserList from "../UserList";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
	const [textQuery, setTextQuery] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
  
	const inputRef = useRef(null);
	const dropdownRef = useRef(null);

	const navigate = useNavigate();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: searchResults, isLoading: isSearching } = useQuery({
		queryKey: ['searchQuery', textQuery], 
		queryFn: async () => {
		  if (!textQuery) return { results: [] }; 
		  const res = await axiosInstance.get(`/users/search?query=${textQuery}`);
		  return res.data;
		},
		enabled: !!textQuery,
	});

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

	const handleInputChange = (e) => {
		setTextQuery(e.target.value);
		if (e.target.value === '') {
		  setShowSuggestions(false);
		} else {
		  setShowSuggestions(true);
		}
	};
	
	const handleSuggestionRemove = () => {
		setTextQuery('');
		setShowSuggestions(false); 
	};
	
	useEffect(() => {
		const handleClickOutside = (event) => {
		  if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target) &&
			inputRef.current &&
			!inputRef.current.contains(event.target)
		  ) {
			setShowSuggestions(false); 
		  }
	};
	
	// Adding the click event listener
	document.addEventListener("click", handleClickOutside);
	
	// Cleaning up the event listener on unmount
	return () => {
		document.removeEventListener("click", handleClickOutside);
	};
	}, []);

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	return (
		<nav className='bg-secondary shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-3'>
					<div className='flex items-center space-x-4'>
						<Link to='/'>
							<img className='h-8 rounded' src='/ugcorner.png' alt='LinkedIn' />
						</Link>
						<div className='sm: hidden md:flex items-start gap-4'>
							<input type="search" ref={inputRef} value={textQuery} onChange={handleInputChange} placeholder="Cari pengguna..."
								className="relative my-input peer z-10 bg-transparent w-12 h-12 rounded-full border cursor-pointer outline-none transition-base focus:w-60 pl-12 focus:border-[#763996] focus:cursor-text focus:pl-16 focus:pr-4"
							/>
							{showSuggestions && textQuery && (
								<ul ref={dropdownRef} className="flex flex-col bg-white rounded-lg w-60 absolute top-16 ml-15 z-10 shadow-xl">
									{isSearching ? (
										<li className="text-center">Loading...</li>
									) :(
										<UserList User={searchResults.results} handleSuggestionRemove={handleSuggestionRemove}/>
									)}
									{searchResults?.results?.length === 0 && !isSearching && (
										<li className="p-2 text-center text-gray-500">No results found</li>
									)}
								</ul>
							)}
							<Search size={20} className="absolute inset-y-0 my-auto h-8 w-12 px-3.5 stroke-gray-500 border-r border-transparent peer-focus:border-[#763996] peer-focus:stroke-[#763996]"/>
						</div>
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
											className='absolute -top-1 -right-0 md:right-4 bg-primary text-white text-xs 
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
