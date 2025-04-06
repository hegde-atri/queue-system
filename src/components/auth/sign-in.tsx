import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "../ui/button";
import { GoogleLogo } from "./google-logo";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SignInButton() {
	const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  }

	return (
		<Button variant={"outline"} onClick={handleSignIn} disabled={loading}>
			<GoogleLogo />
      {loading ? (
        <Loader2 className="animte-spin h-4 w-4" />
        
      ) : (
			<span>Login with Google</span>
      )}
		</Button>
	);
}
