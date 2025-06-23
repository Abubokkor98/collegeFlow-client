import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function Admission() {
  const { collegeId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      candidate_name: user?.displayName || "",
      candidate_email: user?.email || "",
    },
  });

  const { data: college } = useQuery({
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
        navigate("/my-college");
      }
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error("Failed to submit application");
    }
  };

  if (!college) {
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Loading college information...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Admission Application</h1>
        <p className="text-xl">For {college.name}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-base-100 p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium">Full Name *</label>
            <input
              type="text"
              {...register("candidate_name", { required: "Name is required" })}
              className="input input-bordered w-full"
              disabled={!!user?.displayName}
            />
            {errors.candidate_name && (
              <span className="text-error">
                {errors.candidate_name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Email *</label>
            <input
              type="email"
              {...register("candidate_email")}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Subject *</label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="input input-bordered w-full"
            />
            {errors.subject && (
              <span className="text-error">{errors.subject.message}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone Number *</label>
            <input
              type="tel"
              {...register("candidate_phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className="input input-bordered w-full"
              placeholder="1234567890"
            />
            {errors.candidate_phone && (
              <span className="text-error">
                {errors.candidate_phone.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Date of Birth *</label>
            <input
              type="date"
              {...register("date_of_birth", {
                required: "Date of birth is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.date_of_birth && (
              <span className="text-error">{errors.date_of_birth.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Address *</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="textarea textarea-bordered w-full"
              rows="3"
              placeholder="Full address including city and postal code"
            ></textarea>
            {errors.address && (
              <span className="text-error">{errors.address.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Photo URL</label>
            <input
              type="url"
              {...register("image")}
              placeholder="Paste your photo URL (optional)"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
