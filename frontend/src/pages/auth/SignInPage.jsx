const SignInPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col  min-h-[650px] m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:rounded-2xl">
                {/* Bagian kiri dengan gradient dan logo */}
                <div className="flex items-center justify-center bg-gradient-to-br from-purple-600 via-orange-400 to-yellow-300 rounded-l-2xl rounded-r-2xl p-8 md:w-[400px]">
                    <div className="text-left text-white ml-5">
                        <p className="font-syne text-3xl font-semibold mb-6">
                            Tanyakan apa saja yang ingin kamu ketahui
                        </p>
                        <img 
                            src="/logo-gunadarma.svg" 
                            alt="Logo Universitas" 
                            className="w-full max-w-[400px] h-auto mx-auto mb-6"
                        />
                    </div>
                </div>

                {/* Bagian kanan untuk form */}
                <div className="flex flex-col justify-center p-10 md:p-14">
                    <img
                        src="/ugcorner-sq.png"
                        alt="Logo Universitas"
                        className="absolute top-4 right-4 w-14 h-14"
                    />
                    <span className="mb-3 text-4xl font-bold">Masuk</span>
                    <span className="font-light text-gray-500 mb-8">
                        Masuk dengan akun StudentSite
                    </span>
                    <div className="py-2">
                        <span className="mb-2 text-md">Username</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5] transition-all ease-in duration-300"
                            placeholder="Masukkan Username Anda"
                            name="username"
                            id="username"
                        />
                    </div>
                    <div className="py-2 mb-1">
                        <span className="mb-2 text-md">Password</span>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5] transition-all ease-in duration-300"
                            placeholder="Masukkan Password Anda"
                            name="password"
                            id="password"
                        />
                    </div>
                    <div className="py-1 text-gray-400 text-sm">
                        Petunjuk: 
                    </div>
                    <div className="mb-10 text-gray-400 text-sm">
                        Silahkan masuk dengan username dan password akun StudentSite Anda.
                    </div>
                    <button className="bg-[#B369B5] w-full font-bold text-white p-2 rounded-lg mb-1 hover:text-white hover:bg-[#8a528d] transition-all ease-in duration-300">
                        Masuk
                    </button>
                    <button className="text-[#B369B5] font-bold w-full border-none text-md p-2 mb-6 hover:text-[#8a528d] underline transition-all ease-in duration-300">
                        Aktivasi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
