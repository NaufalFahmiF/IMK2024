import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader } from "lucide-react";

const PostCreation = ({ user }) => {
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const queryClient = useQueryClient();

	const { mutate: createPostMutation, isPending } = useMutation({
		mutationFn: async (postData) => {
			const res = await axiosInstance.post("/posts/create", postData, {
				headers: { "Content-Type": "application/json" },
			});
			return res.data;
		},
		onSuccess: () => {
			resetForm();
			toast.success("Postingan berhasil diunggah");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to create post");
		},
	});

	const handlePostCreation = async () => {
		try {
			const postData = { content };
			if (image) postData.image = await readFileAsDataURL(image);

			createPostMutation(postData);
		} catch (error) {
			console.error("Error in handlePostCreation:", error);
		}
	};

	const resetForm = () => {
		setContent("");
		setImage(null);
		setImagePreview(null);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			readFileAsDataURL(file).then(setImagePreview);
		} else {
			setImagePreview(null);
		}
	};

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	return (
		<div className='bg-secondary rounded-lg shadow mb-4 p-4'>
			<div className='flex space-x-3'>
				<img src={user.profilePicture || "/avatar.png"} alt={user.name} className='size-12 rounded-full' />
				<textarea
					placeholder="Apa yang sedang Anda pikirkan?"
					className='w-full p-3 rounded-lg bg-[#fafafa] hover:bg-[#f9f3f9] focus:bg-[#f9f3f9] focus:outline-none resize-none transition-colors duration-200 min-h-[100px]'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>

			{imagePreview && (
				<div className='mt-4'>
					<img src={imagePreview} alt='Selected' className='w-full h-auto rounded-lg' />
				</div>
			)}

			<div className='flex justify-end items-center mt-4 space-x-2'>
				<div className='flex space-x-4'>
					<label className='bg-secondary text-[#763996] font-medium hover:text-white hover:border-[#B76CB7] hover:bg-[#B76CB7] active:text-white active:bg-[#B76CB7] border border-gray-500 rounded-full px-3 py-2 hover:bg-primary-dark transition-base flex items-center space-x-2'>
						<Image size={20} className='' />
						<span >Foto</span>
						<input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
					</label>
				</div>

				<button
					className='bg-neutral hover:bg-[#B76CB7] font-medium text-white rounded-full px-4 py-2 transition-base'
					onClick={handlePostCreation}
					disabled={isPending}
				>
					{isPending ? <Loader className='size-5 animate-spin' /> : "Bagikan"}
				</button>
			</div>
		</div>
	);
};
export default PostCreation;
