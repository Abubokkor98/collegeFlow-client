import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Loading from "../../components/loader/Loading";

export default function AdmissionForm() {
  const { collegeId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      candidate_name: user?.displayName || "",
      candidate_email: user?.email || "",
    },
  });

  const { data: college, isLoading } = useQuery({
    queryKey: ["college", collegeId],
    queryFn: () =>
      axiosPublic.get(`/college/${collegeId}`).then((res) => res.data),
  });

  const onSubmit = async (data) => {
    const admissionData = {
      ...data,
      collegeId,
      collegeName: college?.name,
      candidate_email: user.email,
      status: "pending",
      applicationDate: new Date().toISOString(),
    };

    try {
      const result = await axiosSecure.post("/add-admission", admissionData);
      if (result.data.insertedId) {
        toast.success("Application submitted successfully!");
        reset();
        navigate("/my-college");
      }
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error("Failed to submit application");
    }
  };

  if (isLoading || !college) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">
            Admission Application
          </h1>
          <p className="text-lg text-gray-300 mt-2">For {college.name}</p>
        </div>

        {/* College Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg mb-10 border border-white/10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={college.image}
              alt={college.name}
              className="w-28 h-28 rounded-xl object-cover shadow-md"
            />
            <div className="text-white space-y-1 text-center sm:text-left">
              <h2 className="text-2xl font-semibold">{college.name}</h2>
              <p className="text-sm text-gray-300">
                <span className="font-medium text-white">Admission Dates:</span>{" "}
                {college.admissionDates}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-medium text-white">
                  Application Deadline:
                </span>{" "}
                {college.admissionDates.split(",")[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-lg text-white"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Full Name *
              </label>
              <input
                type="text"
                {...register("candidate_name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500"
                disabled={!!user?.displayName}
              />
              {errors.candidate_name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.candidate_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email *</label>
              <input
                type="email"
                {...register("candidate_email")}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                disabled
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Subject *
              </label>
              <input
                type="text"
                {...register("subject", {
                  required: "Subject is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                placeholder="e.g. Computer Science"
              />
              {errors.subject && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register("candidate_phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Must be 10–15 digits",
                  },
                })}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                placeholder="e.g. 017XXXXXXXX"
              />
              {errors.candidate_phone && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.candidate_phone.message}
                </p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Date of Birth *
              </label>
              <input
                type="date"
                {...register("date_of_birth", {
                  required: "DOB required",
                  validate: (value) => {
                    const dob = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - dob.getFullYear();
                    return age >= 16 || "You must be at least 16 years old";
                  },
                })}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                max={new Date().toISOString().split("T")[0]}
              />
              {errors.date_of_birth && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.date_of_birth.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Address *
              </label>
              <textarea
                {...register("address", {
                  required: "Address required",
                  minLength: { value: 10, message: "Min 10 characters" },
                })}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                rows="3"
                placeholder="Full address, city, zip..."
              />
              {errors.address && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div className="sm:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Photo URL
              </label>
              <input
                type="url"
                {...register("image", {
                  pattern: {
                    value: /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)$/i,
                    message: "Invalid image URL",
                  },
                })}
                placeholder="Optional image URL"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
              />
              {errors.image && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
            <button
              type="button"
              className="px-6 py-3 rounded-xl text-white border border-white/20 hover:border-white transition-all"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
