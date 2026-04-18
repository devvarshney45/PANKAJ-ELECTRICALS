import {Navigate} from "react-router-dom";

export default function ProtectedAdmin({children}) {
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch (err) {
    console.error("ProtectedAdmin: Failed to parse user", err);
  }

  if(!user || !user.isAdmin){
    return <Navigate to="/login" />;
  }

  return children;
}