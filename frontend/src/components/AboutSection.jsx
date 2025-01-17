import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState(userData.about || "");

	const handleSave = () => {
		setIsEditing(false);
		onSave({ about });
	};
	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Tentang</h2>
			<p>{userData.about}</p>
			{isOwnProfile && (
				<>
					{isEditing ? (
						<>
							<span className="text-md font-medium">Tambahkan ringkasan mengenai diri Anda</span>
							<textarea
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								placeholder="Misalnya: Saya adalah seorang yang ramah dan bertanggung jawab"
								className='w-full mt-2 p-2 border rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
								rows='4'
							/>
							<button
								onClick={handleSave}
								className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-[#8a528d] 
								transition-base font-medium'
							>
								Simpan
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => setIsEditing(true)}
								className='mt-2 text-primary hover:text-[#8a528d] hover:underline transition-base'
							>
								Ubah
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
};
export default AboutSection;
