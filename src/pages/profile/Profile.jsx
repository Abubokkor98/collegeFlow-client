import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Mail, MapPin, University } from "lucide-react";

export default function Profile() {
  const { user, setUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: userData, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () =>
      axiosSecure.get(`/user/${user?.email}`).then((res) => res.data),
    enabled: !!user,
  });

  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/user/${user.email}`, data);
      await updateUserProfile({
        displayName: data.name,
      });
      setUser((prevUser) => ({
        ...prevUser,
        displayName: data.name,
      }));
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Card */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 lg:flex-row">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-gray-700"
              />
            </div>

            {/* Info */}
            <div className="text-center lg:text-left flex-1 w-full">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                {userData?.name || user.displayName}
              </h2>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-blue-400 mb-3 sm:mb-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base break-all">
                  {user.email}
                </span>
              </div>
              {userData?.university && (
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300 mb-3 sm:mb-4">
                  <University className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    {userData.university}
                  </span>
                </div>
              )}
              {userData?.address && (
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    {userData.address}
                  </span>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 sm:py-2 sm:px-6 rounded-xl transition-all text-sm sm:text-base w-full sm:w-auto"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block mb-2 text-gray-300 text-sm sm:text-base">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  defaultValue={userData?.name}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gray-800 text-white border border-white/20 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                {errors.name && (
                  <span className="text-red-400 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-gray-300 text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gray-800 text-gray-500 border border-white/20 cursor-not-allowed text-sm sm:text-base"
                />
              </div>

              {/* University */}
              <div>
                <label className="block mb-2 text-gray-300 text-sm sm:text-base">
                  University
                </label>
                <input
                  type="text"
                  {...register("university")}
                  defaultValue={userData?.university}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gray-800 text-white border border-white/20 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              {/* Address */}
              <div className="lg:col-span-2">
                <label className="block mb-2 text-gray-300 text-sm sm:text-base">
                  Address
                </label>
                <textarea
                  {...register("address")}
                  defaultValue={userData?.address}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gray-800 text-white border border-white/20 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="bg-gray-700 text-gray-300 py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all text-sm sm:text-base"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
