import { School, X } from "lucide-react";
import { useState } from "react";

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
		}
	};

	const handleDeleteEducation = (id) => {
		setEducations(educations.filter((edu) => edu._id !== id));
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
								{edu.startYear} - {edu.endYear || "Present"}
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
					<input
						type='text'
						placeholder='Instansi Pendidikan'
						value={newEducation.school}
						onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
						className='w-full p-2 border mb-2 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<input
						type='text'
						placeholder='Bidang Studi'
						value={newEducation.fieldOfStudy}
						onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
						className='w-full p-2 border mb-2 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<input
						type='number'
						placeholder='Tahun Mulai'
						value={newEducation.startYear}
						onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
						className='w-full p-2 border mb-2 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
					/>
					<input
						type='number'
						placeholder='Tahun Selesai'
						value={newEducation.endYear}
						onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
						className='w-full p-2 border mb-2 rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]'
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
