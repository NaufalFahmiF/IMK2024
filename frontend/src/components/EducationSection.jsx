import { School, X } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [educations, setEducations] = useState(userData.education || []);
	const [newEducation, setNewEducation] = useState({
		school: "",
		fieldOfStudy: "",
		startYear: "",
		endYear: "",
	});

	const handleAddEducation = () => {
		if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
			setEducations([...educations, newEducation]);
			setNewEducation({
				school: "",
				fieldOfStudy: "",
				startYear: "",
				endYear: "",
			});
			toast.success("Pendidikan berhasil ditambahkan");
		}

		const { school, fieldOfStudy, startYear, endYear } = newEducation;

		if (
			!school.trim() &&
			!fieldOfStudy.trim() &&
			!startYear.trim() &&
			!endYear.trim()
		) {
			toast.error("Semua kolom masih kosong");
			return;
		}
	};

	const handleDeleteEducation = (id) => {
		Swal.fire({
			title: "Apakah Anda yakin?",
			text: "Pendidikan yang dihapus tidak dapat dipulihkan",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#B76CB7",
			confirmButtonText: "Hapus",
			cancelButtonText: "Batal",
			customClass: {
				cancelButton: "bg-black text-white",
			},
		}).then((result) => {
			if (result.isConfirmed) {
				setEducations(educations.filter((edu) => edu._id !== id));
	
				toast.success("Pendidikan berhasil dihapus");
			}
		});
	};

	const handleSave = () => {
		onSave({ education: educations });
		setIsEditing(false);
	};

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Pendidikan</h2>
			{educations.map((edu) => (
				<div key={edu._id} className='mb-4 flex justify-between items-start'>
					<div className='flex items-start'>
						<School size={20} className='mr-2 mt-1' />
						<div>
							<h3 className='font-semibold'>{edu.fieldOfStudy}</h3>
							<p className='text-gray-600'>{edu.school}</p>
							<p className='text-gray-500 text-sm'>
								{edu.startYear} - {edu.endYear || "Sekarang"}
							</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteEducation(edu._id)} className='text-[#B369B5]'>
							<X size={20} />
						</button>
					)}
				</div>
			))}
			{isEditing && (
				<div className='mt-4'>
					<span className="text-md font-medium">Instansi Pendidikan</span>
					<input
						type='text'
						placeholder='Misalnya: Universitas Gunadarma'
						value={newEducation.school}
						onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
						className='w-full p-2 border mt-2 mb-3 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<span className="text-md font-medium">Bidang Studi</span>
					<input
						type='text'
						placeholder='Misalnya: Sistem Informasi'
						value={newEducation.fieldOfStudy}
						onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
						className='w-full p-2 border mt-2 mb-3 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<span className="text-md font-medium">Tahun Mulai</span>
					<input
						type='number'
						placeholder='Misalnya: 2022'
						value={newEducation.startYear}
						onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
						className='w-full p-2 border mt-2 mb-3 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<span className="text-md font-medium">Tahun Berakhir</span>
					<input
						type='number'
						placeholder='Misalnya: 2026'
						value={newEducation.endYear}
						onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
						className='w-full p-2 border mt-2 mb-3 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<button
						onClick={handleAddEducation}
						className='bg-primary text-white mt-3 py-2 px-4 rounded hover:bg-[#8a528d] transition-base font-medium'
					>
						Tambah Pendidikan
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-[#8a528d] transition-base font-medium'
						>
							Simpan Perubahan
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-4 text-primary hover:text-[#8a528d] hover:underline transition-base'
						>
							Ubah Pendidikan
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default EducationSection;
