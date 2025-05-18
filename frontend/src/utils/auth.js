import jwtDecode from "jwt-decode";

export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // contains fields like id, email, role (if present in JWT)
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
