import { Mail, MapPin, University } from "lucide-react";

export default function UserProfile({ user, userData, onEditClick }) {
  return (
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
            <span className="text-sm sm:text-base break-all">{user.email}</span>
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
              <span className="text-sm sm:text-base">{userData.address}</span>
            </div>
          )}
        </div>

        {/* Edit Button */}
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 sm:py-2 sm:px-6 rounded-xl transition-all text-sm sm:text-base w-full sm:w-auto"
          onClick={onEditClick}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
