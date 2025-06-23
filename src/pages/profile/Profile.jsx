import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Edit, Mail, MapPin, Save, X } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: userData, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () =>
      axiosSecure.get(`/user/${user?.email}`).then((res) => res.data),
    onSuccess: (data) => {
      if (data) {
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("university", data.university);
        setValue("address", data.address);
      }
    },
    enabled: !!user,
  });

  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/user/${user.email}`, data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your profile</h2>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl transition-all">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Card */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-700"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">
                {userData?.name || user.displayName || "Your Name"}
              </h2>
              <div className="flex items-center space-x-2 text-blue-400 mb-4">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              {userData?.address && (
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>{userData.address}</span>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-xl transition-all"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-gray-300">Full Name *</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <span className="text-red-400">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-500 border border-white/20 placeholder-gray-400"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">University</label>
                <input
                  type="text"
                  {...register("university")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your university"
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-gray-300">Address</label>
                <textarea
                  {...register("address")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Your current address"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="bg-gray-700 text-gray-300 py-3 px-6 rounded-xl transition-all"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
