import React, { useState, useEffect, useContext } from "react";
import useAxiosSecure from "../Sharedpages/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // ✅ import toast
import Spinner from "../Router/Spinner";

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [user1, setUser1] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false); // ✅ to disable save button

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/users?email=${user.email}`)
      .then(res => {
        setUser1(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error("Failed to fetch user:", err));
  }, [user?.email]);

  if (!user1) return <div className="text-center py-10"><Spinner/></div>;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handleSave = () => {
  setSaving(true);
  const { _id, ...dataWithoutId } = formData;
  axiosSecure.put(`/users/${user1._id}`, dataWithoutId)
    .then(res => {
        setUser1(formData);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    })
    .catch(err => {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Failed to update profile.");
    })
    .finally(() => setSaving(false));
};


  return (
    <div className="bg-secondary py-20 w-full">
      <Toaster /> {/* ✅ toast container */}
      <h1 className="text-3xl font-semibold text-center">My Profile</h1>
      <p className="text-center py-5 font-semibold opacity-70">
        Manage and update your personal information
      </p>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={user1.photo}
            alt={user1.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          <h2 className="text-2xl font-semibold mt-4">{user1.name}</h2>
          <p className="text-gray-500">{user1.email}</p>
          <p className="bg-gray-100 px-3 py-1 mt-2 rounded-full text-sm">
            Role: {user1.role}
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-8 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                placeholder="Enter your name"
              />
            ) : (
              <p className="text-gray-800">{user1.name}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-600 font-medium">Profile Picture</label>
            {editMode ? (
              <input
                type="text"
                name="photo"
                value={formData.photo || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                placeholder="Enter image URL"
              />
            ) : (
              <p className="text-gray-800">
                {user1.photo ? "Profile picture set" : "Not provided yet"}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <p className="text-gray-800">{user1.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 font-medium">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                placeholder="Enter phone number"
              />
            ) : (
              <p className="text-gray-800">{user1.phone || "Not provided yet"}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-600 font-medium">Address</label>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                placeholder="Enter address"
              />
            ) : (
              <p className="text-gray-800">{user1.address || "Not provided yet"}</p>
            )}
          </div>

          {/* Coins */}
          <div>
            <label className="block text-gray-600 font-medium">Coins</label>
            <p className="text-gray-800">{user1.coin ?? 0}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-accent text-white rounded-lg"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-accent text-white rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
