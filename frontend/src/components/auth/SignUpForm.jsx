import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader, Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: signUpMutation, isLoading } = useMutation({
        mutationFn: async (data) => {
			const res = axiosInstance.post("/auth/signup", data);
            console.log(data);
			return res.data; 
		},
        onSuccess: () => {
			toast.success("Akun berhasil dibuat");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message || "Terjadi kesalahan");
        },
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        signUpMutation({ name, username, email, password });
    };

    return (
        <form onSubmit={handleSignUp} className='py-2'>
            <span className="text-md font-medium">Nama Lengkap</span>
            <input
                type='text'
                placeholder='Masukkan Nama Lengkap Anda'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full mt-2 p-2 border mb-1 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
			<span className="text-md font-medium">Username</span>
            <input
                type='text'
                placeholder='Masukkan Username Anda'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full mt-2 p-2 border mb-1 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
            <span className="text-md font-medium">Email</span>
            <input
                type='email'
                placeholder='Masukkan Email Anda'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full mt-2 p-2 border mb-1 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
			<span className="text-md font-medium">Password</span>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Masukkan Password Anda'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full mt-2 p-2 border mb-1 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-16 -translate-y-8 flex items-center text-gray-500"
            >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <div className="py-1 text-gray-400 text-sm font-regular">
                Petunjuk: 
            </div>
            <div className="mb-10 text-gray-400 text-sm font-regular">
                Silahkan aktivasi akun Anda menggunakan kredensial akun Studentsite Anda.
            </div>
            <button type='submit' disabled={isLoading} className='bg-[#B369B5] w-full font-bold text-white p-2 rounded-lg hover:text-white hover:bg-[#8a528d] transition-all ease-in duration-300'>
                {isLoading ? <Loader className='size-5 animate-spin' /> : "Aktivasi"}
            </button>
        </form>
    );
};

export default SignUpForm;