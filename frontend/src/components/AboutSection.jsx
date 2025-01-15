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
			{isOwnProfile && (
				<>
					{isEditing ? (
						<>
							<textarea
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								placeholder="Tambahkan deskripsi tentang diri Anda"
								className='w-full p-2 border rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
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
							<p>{userData.about}</p>
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
