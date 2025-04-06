import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "../ui/button";
 
export function SignInButton() {
  const { signIn } = useAuthActions();
  return (
    <Button onClick={() => void signIn("google")}>Login</Button>
  );
}