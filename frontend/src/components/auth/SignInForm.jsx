import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader, Eye, EyeOff } from "lucide-react";

const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: loginMutation, isLoading } = useMutation({
        mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Berhasil masuk");
        },
        onError: (err) => {
            toast.error(err.response.data.message || "Terjadi suatu kesalahan");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation({ username, password });
    };

    return (
        <form onSubmit={handleSubmit} className='py-2'>
            <span className="text-md font-medium">Username</span>
            <input
                type='text'
                placeholder='Masukkan Username Anda'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full p-2 mt-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
            <span className="text-md font-medium">Password</span>
            <div className="relative w-full">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Masukkan Password Anda'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-2 mt-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            <div className="py-1 text-gray-400 text-sm font-regular">
                Petunjuk: 
            </div>
            <div className="mb-10 text-gray-400 text-sm font-regular">
                Silahkan masuk dengan username dan password akun UGCorner Anda.
            </div>
            <button type='submit' className='bg-[#B369B5] w-full font-bold text-white p-2 rounded-lg hover:text-white hover:bg-[#8a528d] transition-all ease-in duration-300'>
                {isLoading ? <Loader className='size-5 animate-spin' /> : "Masuk"}
            </button>
        </form>
    );
};

export default SignInForm;