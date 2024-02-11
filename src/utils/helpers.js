import { signInWithRedirect, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

const provider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, provider).then((result) => {
    window.location.reload();
  });
};

export const signInWithGitHub = async () => {
  await signInWithRedirect(auth, gitHubProvider).then((result) => {
    window.location.reload();
  });
};

export const Menus = [
  { id:uuidv4() , name: "Projects", path: "/home/projects" },
  { id:uuidv4() , name: "Profile", path: "/home/profile" },
  
];

export const signOutAction = async () => {
  
  await auth.signOut().then(() => {
    window.location.reload();
  });
};
