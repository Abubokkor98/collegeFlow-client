import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function GoogleLogin() {
  const { googleSignIn, setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const userData = {
        email: user.email,
        name: user.displayName,
      };

      // Save user to database
      const response = await axiosPublic.post(`/users`, userData);

      setUser(user);
      navigate(location?.state ? location.state : "/");

      // Show appropriate success message
      if (response.data.inserted) {
        toast.success("Account created successfully");
      } else {
        toast.success("User login successfully");
      }
    } catch (error) {
      // Better error handling
      let message = "Google sign-in failed";

      if (error?.code) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            message = "Sign-in cancelled";
            break;
          case "auth/popup-blocked":
            message = "Popup blocked. Please allow popups and try again";
            break;
          case "auth/network-request-failed":
            message = "Network error. Please check your connection";
            break;
          default:
            message = error.message || "Authentication failed";
        }
      } else if (error?.message) {
        message = error.message;
      }

      // Only show error for actual errors, not cancellations
      if (
        !error?.code?.includes("cancelled") &&
        !error?.code?.includes("popup-closed")
      ) {
        toast.error(message);
      }

      console.error("Google authentication error:", message);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogle}
        className="w-full py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-lg"
      >
        <div className="flex items-center justify-center space-x-3">
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          <span>Continue with Google</span>
        </div>
      </button>
    </div>
  );
}
