import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UserProfile from "../../components/profile/UserProfile";
import ProfileEditForm from "../../components/profile/ProfileEditForm";

export default function Profile() {
  const { user, setUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  console.log(user);

  const { data: userData, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () =>
      axiosSecure.get(`/user/${user?.email}`).then((res) => res.data),
    enabled: !!user,
  });

  const handleSubmit = async (data) => {
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl">
        <UserProfile
          user={user}
          userData={userData}
          onEditClick={handleEditClick}
        />

        {isEditing && (
          <ProfileEditForm
            user={user}
            userData={userData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
