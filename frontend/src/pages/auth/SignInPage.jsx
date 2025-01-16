import { Link } from "react-router-dom";
import SignInForm from "../../components/auth/SignInForm";

const SignInPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col min-h-[650px] m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:rounded-2xl">
                {/* Bagian kiri dengan gradient dan logo */}
                <div className="flex items-center justify-center bg-gradient-to-br from-purple-600 via-orange-400 to-yellow-300 rounded-l-2xl p-8 md:w-[400px]">
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
                    <span className="font-regular text-gray-400 mb-8">
                        Masuk dengan akun StudentSite
                    </span>
                    <SignInForm />
                    <Link to='/signup' className="text-[#B369B5] text-center font-bold w-full border-none text-md p-2 mb-6 hover:text-[#8a528d] underline transition-all ease-in duration-300">
                        Aktivasi
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;