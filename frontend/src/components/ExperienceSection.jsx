import { Briefcase, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/dateUtils";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Datepicker from "tailwind-datepicker-react"

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [experiences, setExperiences] = useState(userData.experience || []);
	const [newExperience, setNewExperience] = useState({
		title: "",
		company: "",
		startDate: "",
		endDate: "",
		description: "",
		currentlyWorking: false,
	});

	const handleAddExperience = () => {
		if (newExperience.title && newExperience.company && newExperience.startDate) {
			setExperiences([...experiences, newExperience]);

			setNewExperience({
				title: "",
				company: "",
				startDate: "",
				endDate: "",
				description: "",
				currentlyWorking: false,
			});

			toast.success("Pengalaman berhasil ditambahkan");
		}

		const { title, company, startDate, endDate, description, currentlyWorking } = newExperience;

		if (
			!title.trim() &&
			!company.trim() &&
			!startDate.trim() &&
			(!currentlyWorking && !endDate.trim()) &&
			!description.trim()
		) {
			toast.error("Semua kolom masih kosong");
			return;
		}
	};

	const handleDeleteExperience = (id) => {
		Swal.fire({
			title: "Apakah Anda yakin?",
			text: "Pengalaman yang dihapus tidak dapat dipulihkan",
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
				setExperiences(experiences.filter((exp) => exp._id !== id));
	
				toast.success("Pengalaman berhasil dihapus");
			}
		});
	};
	

	const handleSave = () => {
		onSave({ experience: experiences });
		setIsEditing(false);
	};

	const handleCurrentlyWorkingChange = (e) => {
		setNewExperience({
			...newExperience,
			currentlyWorking: e.target.checked,
			endDate: e.target.checked ? "" : newExperience.endDate,
		});
	};

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Pengalaman</h2>
			{experiences.map((exp) => (
				<div key={exp._id} className='mb-4 flex justify-between items-start'>
					<div className='flex items-start'>
						<Briefcase size={20} className='mr-2 mt-1' />
						<div>
							<h3 className='font-semibold'>{exp.title}</h3>
							<p className='text-gray-600'>{exp.company}</p>
							<p className='text-gray-500 text-sm'>
								{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Sekarang"}
							</p>
							<p className='text-gray-700'>{exp.description}</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteExperience(exp._id)} className='text-[#B369B5]'>
							<X size={20} />
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className='mt-4'>
					<span className="text-md font-medium">Posisi</span>
					<input
						type='text'
						placeholder='Misalnya: Ketua Praktikum'
						value={newExperience.title}
						onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
						className='w-full p-2 mt-2 border mb-3 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<span className="text-md font-medium">Perusahaan atau organisasi</span>
					<input
						type='text'
						placeholder='Misalnya: Laboratorium Sistem Informasi'
						value={newExperience.company}
						onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
						className='w-full p-2 border mt-2 mb-3 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<span className='text-md font-medium'>Tanggal Mulai</span>
					<input
						type='date'
						placeholder='Tanggal Mulai'
						value={newExperience.startDate}
						onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
						className='w-full p-2 border mt-2 mb-1 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<div className='flex items-center mb-2'>
						<input
							type='checkbox'
							id='currentlyWorking'
							checked={newExperience.currentlyWorking}
							onChange={handleCurrentlyWorkingChange}
							className='mr-2 accent-[#B369B5] mb-3'
						/>
						<label htmlFor='currentlyWorking' className='mb-3'>Saat ini saya bekerja di sini </label>
					</div>
					{!newExperience.currentlyWorking && (
						<>
						<span className="text-md font-medium">Tanggal Berakhir</span>
						<input
							type='date'
							placeholder='Tanggal berakhir'
							value={newExperience.endDate}
							onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
							className='w-full mt-2 mb-3 p-2 border rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
						/>
						</>
					)}
					<span className="text-md font-medium">Deskripsi</span>
					<textarea
						placeholder='Misalnya: Selama praktikum, saya bertanggung jawab atas berlangsungnya kegiatan...'
						value={newExperience.description}
						onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
						className='w-full p-2 border mt-2 mb-3 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<button
						onClick={handleAddExperience}
						className='bg-primary text-white mt-3 py-2 px-4 rounded hover:bg-[#8a528d] transition-base font-medium'
					>
						Tambah Pengalaman
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
							Ubah Pengalaman
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default ExperienceSection;
