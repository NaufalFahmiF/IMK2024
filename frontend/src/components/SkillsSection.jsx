import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState("");

	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
			toast.success("Kemampuan berhasil ditambahkan");
		}

		if (!newSkill.trim()) {
			toast.error("Kemampuan masih kosong");
			return;
		}
	};

	const handleDeleteSkill = (skill) => {
		Swal.fire({
			title: "Apakah Anda yakin?",
			text: "Kemampuan yang dihapus tidak dapat dipulihkan",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#B76CB7",
			confirmButtonText: "Hapus",
			cancelButtonText: "Batal",
			customClass: {
				cancelButton: "bg-gray-300 text-black",
			},
		}).then((result) => {
			if (result.isConfirmed) {
				setSkills(skills.filter((s) => s !== skill));
	
				toast.success("Kemampuan berhasil dihapus");
			}
		});
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
						placeholder='Tambahkan kemampuan baru'
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className='flex-grow p-2 border rounded-l focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<button
						onClick={handleAddSkill}
						className='bg-primary text-white py-2 px-4 rounded-r hover:bg-[#8a528d] transition-base font-medium'
					>
						Tambahkan kemampuan
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
