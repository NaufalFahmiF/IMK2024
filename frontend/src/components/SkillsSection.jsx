import { X } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState("");

	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
		}
	};

	const handleDeleteSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};

	const handleSave = () => {
		onSave({ skills });
		setIsEditing(false);
	};

	return (
		<div className='bg-white shadow rounded-lg p-6'>
			<h2 className='text-xl font-semibold mb-4'>Kemampuan</h2>
			<div className='flex flex-wrap'>
				{skills.map((skill, index) => (
					<span
						key={index}
						className='bg-[#e8deee] text-[#763996] text-medium px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'
					>
						{skill}
						{isEditing && (
							<button onClick={() => handleDeleteSkill(skill)} className='ml-2 text-[#B369B5]'>
								<X size={14} />
							</button>
						)}
					</span>
				))}
			</div>

			{isEditing && (
				<div className='mt-4 flex'>
					<input
						type='text'
						placeholder='Tambahkan Skill baru'
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className='flex-grow p-2 border rounded-l focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<button
						onClick={handleAddSkill}
						className='bg-primary text-white py-2 px-4 rounded-r hover:bg-[#8a528d] transition-base font-medium'
					>
						Tambahkan skill
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className='mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-[#8a528d] transition-base font-medium'
						>
							Simpan Perubahan
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-4 text-primary hover:text-[#8a528d] hover:underline transition-base'
						>
							Ubah Kemampuan
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default SkillsSection;
