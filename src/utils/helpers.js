import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.config";

const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, provider).then((result) => {
    window.location.reload();
  });
};
