export default function CollegeInformation({ admission }) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold text-white">
          {admission.collegeName}
        </h1>
        <p className="text-gray-400 mt-2">Your selected college</p>
      </div>

      <section className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          Admission Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
          <p>
            <span className="font-semibold text-white">Name:</span>{" "}
            {admission.candidate_name}
          </p>
          <p>
            <span className="font-semibold text-white">Email:</span>{" "}
            {admission.candidate_email}
          </p>
          <p>
            <span className="font-semibold text-white">Subject:</span>{" "}
            {admission.subject}
          </p>
          <p>
            <span className="font-semibold text-white">Status:</span>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${
                admission.status === "approved"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            >
              {admission.status}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
