import { toast } from "react-hot-toast";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useNavigate } from "react-router";

export default function useGoogleAuth() {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleAuth = async (redirectTo = "/") => {
    try {
      const result = await googleSignIn();
      const googleUser = result.user;

      const user = { email: googleUser.email, name: googleUser.displayName };

      // Save user
      const response = await axiosPublic.post(`/users`, user);

      if (response.data.inserted) {
        toast.success("Account created successfully");
      } else {
        toast.success("Logged in successfully");
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err?.message || "Google sign-in failed";
      console.error("Google authentication error:", message);
      toast.error(message);
    }
  };

  return handleGoogleAuth;
}
