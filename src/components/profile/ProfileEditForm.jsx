import { useForm } from "react-hook-form";

export default function ProfileEditForm({
  user,
  userData,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
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
            <span className="text-red-400 text-sm">{errors.name.message}</span>
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
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
