import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader, Eye, EyeOff } from "lucide-react";
import {useNavigate} from 'react-router-dom';

const SignUpForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: signUpMutation, isLoading } = useMutation({
        mutationFn: async (data) => {
			const res = axiosInstance.post("/auth/signup", data);
            console.log(data);
			return res.data; 
		},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Akun berhasil dibuat");
            navigate("/signin");
        },
        onError: (err) => {
            toast.error(err.response.data.message || "Terjadi kesalahan");
        },
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        signUpMutation({ name, username, email, password });
    };

    const checkPasswordStrength = (password) => {
        const lengthCriteria = password.length >= 8;
        const upperCaseCriteria = /[A-Z]/.test(password);
        const lowerCaseCriteria = /[a-z]/.test(password);
        const numberCriteria = /\d/.test(password);
        const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        let strength = 0;

        if (lengthCriteria) strength += 1;
        if (upperCaseCriteria) strength += 1;
        if (lowerCaseCriteria) strength += 1;
        if (numberCriteria) strength += 1;
        if (specialCharacterCriteria) strength += 1;

        setPasswordStrength(strength); // Set strength level

        return strength;
    };

    return (
        <form onSubmit={handleSignUp} className='py-2'>
            <span className="text-md font-medium">Nama Lengkap</span>
            <input
                type='text'
                placeholder='Masukkan Nama Lengkap Anda'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full mt-2 p-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
			<span className="text-md font-medium">Username</span>
            <input
                type='text'
                placeholder='Masukkan Username Anda'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full mt-2 p-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
            <span className="text-md font-medium">Email</span>
            <input
                type='email'
                placeholder='Masukkan Email Anda'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full mt-2 p-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
                required
            />
			<span className="text-md font-medium">Password</span>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Masukkan Password Anda'
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value)
                }}
                className={`w-full mt-2 p-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5] 
                    ${passwordStrength === 0 ? 'border-gray-300 focus:border-gray-300 focus:ring-gray-300' : ''}
                    ${passwordStrength === 1 ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    ${passwordStrength === 2 ? 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500' : ''}
                    ${passwordStrength === 3 ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500' : ''}
                    ${passwordStrength === 4 ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : ''}
                    ${passwordStrength >= 5 ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : ''}
                `}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-16 -translate-y-8 flex items-center text-gray-500"
            >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <div className="mt-2">
            <div className={`h-1 w-full rounde  d-md ${passwordStrength === 0 ? 'bg-gray-300' : ''} ${passwordStrength === 1 ? 'bg-red-500' : ''} ${passwordStrength === 2 ? 'bg-yellow-500' : ''} ${passwordStrength === 3 ? 'bg-blue-500' : ''} ${passwordStrength === 4 ? 'bg-green-500' : ''} ${passwordStrength >= 5 ? 'bg-green-500' : ''}`}></div>
                <p className="text-sm text-gray-500 mt-1">
                    {passwordStrength === 0 && "Password terlalu lemah"}
                    {passwordStrength === 1 && "Password terlalu lemah"}
                    {passwordStrength === 2 && "Password cukup aman"}
                    {passwordStrength === 3 && "Password aman"}
                    {passwordStrength === 4 && "Password sangat aman"}
                    {passwordStrength >= 5 && "Password sangat aman"}
                </p>
            </div>
            <button type='submit' disabled={isLoading} className='bg-[#B369B5] w-full mt-10 font-bold text-white p-2 rounded-lg hover:text-white hover:bg-[#8a528d] transition-all ease-in duration-300'>
                {isLoading ? <Loader className='size-5 animate-spin' /> : "Daftar"}
            </button>
        </form>
    );
};

export default SignUpForm;