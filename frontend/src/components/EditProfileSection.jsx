import { useState } from "react";
import { UserPen, ScanFace, MapPinHouse } from "lucide-react";

const EditProfileSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        name: userData.name || "",
        headline: userData.headline || "",
        location: userData.location || "",
    });

    const handleSave = () => {
        setIsEditing(false);
        onSave(editedData);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Profil</h2>
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <div>
                            <div className="mb-4">
                                <label className="block text-md font-medium mb-2">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    value={editedData.name}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, name: e.target.value })
                                    }
                                    className="w-full p-2 border rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-md font-medium mb-2">
                                    Headline
                                </label>
                                <input
                                    type="text"
                                    value={editedData.headline}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, headline: e.target.value })
                                    }
                                    className="w-full p-2 border rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-md font-medium mb-2">
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    value={editedData.location}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, location: e.target.value })
                                    }
                                    className="w-full p-2 border rounded-md focus:outline-none focus:border-[#B369B5] focus:ring-2 focus:ring-[#B369B5]"
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                className="mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-[#8a528d] transition-base font-medium"
                            >
                                Simpan
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <UserPen size={18} className="mr-2" />
                                    <p className="w-20 font-bold">Nama</p>
                                    <p>: {userData.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <ScanFace size={18} className="mr-2" />
                                    <p className="w-20 font-bold">Headline</p>
                                    <p>: {userData.headline}</p>
                                </div>
                                <div className="flex items-center">
                                    <MapPinHouse size={18} className="mr-2" />
                                    <p className="w-20 font-bold">Lokasi</p>
                                    <p>: {userData.location}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-2 text-primary hover:text-[#8a528d] hover:underline transition-base"
                            >
                                Edit Profil
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EditProfileSection;